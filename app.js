const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        icon: path.join(__dirname, `/dist/assets/images/logo/pass-logo.png`),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
        },
    });

    loadWindow(mainWindow);

    mainWindow.maximize();
    mainWindow.show();

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.on("did-fail-load", () => {
        console.log("did-fail-load");
        loadWindow(mainWindow);
        // REDIRECT TO FIRST WEBPAGE AGAIN
    });

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

function loadWindow(mainWindow) {
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true,
        })
    );
}
function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};

if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

ipcMain.on("write-error-log", (event, arg) => {
    let apiURL = "";
    if (arg.apiURL) {
        apiURL = `Failed API URL is : [${arg.apiURL}],`;
    }
    let error = `\r\n [${arg.date}] : ${apiURL} Actual Error is : ${arg.error} \r\n`;
    fs.appendFileSync("log.log", error, "utf-8");
});

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (mainWindow === null) createWindow();
});

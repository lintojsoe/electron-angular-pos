var electronInstaller = require("electron-winstaller");
// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: "./pass-win32-x64",
    // Specify the existing folder where
    outputDirectory: "./pass-installers",
    // The name of the Author of the app (the name of your company)
    authors: "PASS",
    // The name of the executable of your built
    exe: "./pass.exe",
    iconUrl: "https://www.getpass.me/wp-content/uploads/2020/05/pass-logo@2x.png",
    noMsi: true,
    description: "Pass POS",
};
resultPromise = electronInstaller.createWindowsInstaller(settings);
resultPromise.then(
    () => {
        console.log(
            "The installers of your application were succesfully created !"
        );
    },
    (e) => {
        console.log(`Well, sometimes you are not so lucky: ${e.message}`);
    }
);

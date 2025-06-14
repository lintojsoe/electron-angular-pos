/*! ePOS-Print API Version 4.1.0 Copyright (C) SEIKO EPSON CORPORATION 2011. All rights reserved. */
(function (window, undefined) {
    function ePOSBuilder() {
        this.message = "";
        this.halftone = 0;
        this.brightness = 1;
        this.force = false;
        this.FONT_A = "font_a";
        this.FONT_B = "font_b";
        this.FONT_C = "font_c";
        this.FONT_D = "font_d";
        this.FONT_E = "font_e";
        this.FONT_SPECIAL_A = "special_a";
        this.FONT_SPECIAL_B = "special_b";
        this.ALIGN_LEFT = "left";
        this.ALIGN_CENTER = "center";
        this.ALIGN_RIGHT = "right";
        this.COLOR_NONE = "none";
        this.COLOR_1 = "color_1";
        this.COLOR_2 = "color_2";
        this.COLOR_3 = "color_3";
        this.COLOR_4 = "color_4";
        this.FEED_PEELING = "peeling";
        this.FEED_CUTTING = "cutting";
        this.FEED_CURRENT_TOF = "current_tof";
        this.FEED_NEXT_TOF = "next_tof";
        this.MODE_MONO = "mono";
        this.MODE_GRAY16 = "gray16";
        this.BARCODE_UPC_A = "upc_a";
        this.BARCODE_UPC_E = "upc_e";
        this.BARCODE_EAN13 = "ean13";
        this.BARCODE_JAN13 = "jan13";
        this.BARCODE_EAN8 = "ean8";
        this.BARCODE_JAN8 = "jan8";
        this.BARCODE_CODE39 = "code39";
        this.BARCODE_ITF = "itf";
        this.BARCODE_CODABAR = "codabar";
        this.BARCODE_CODE93 = "code93";
        this.BARCODE_CODE128 = "code128";
        this.BARCODE_GS1_128 = "gs1_128";
        this.BARCODE_GS1_DATABAR_OMNIDIRECTIONAL =
            "gs1_databar_omnidirectional";
        this.BARCODE_GS1_DATABAR_TRUNCATED = "gs1_databar_truncated";
        this.BARCODE_GS1_DATABAR_LIMITED = "gs1_databar_limited";
        this.BARCODE_GS1_DATABAR_EXPANDED = "gs1_databar_expanded";
        this.HRI_NONE = "none";
        this.HRI_ABOVE = "above";
        this.HRI_BELOW = "below";
        this.HRI_BOTH = "both";
        this.SYMBOL_PDF417_STANDARD = "pdf417_standard";
        this.SYMBOL_PDF417_TRUNCATED = "pdf417_truncated";
        this.SYMBOL_QRCODE_MODEL_1 = "qrcode_model_1";
        this.SYMBOL_QRCODE_MODEL_2 = "qrcode_model_2";
        this.SYMBOL_QRCODE_MICRO = "qrcode_micro";
        this.SYMBOL_MAXICODE_MODE_2 = "maxicode_mode_2";
        this.SYMBOL_MAXICODE_MODE_3 = "maxicode_mode_3";
        this.SYMBOL_MAXICODE_MODE_4 = "maxicode_mode_4";
        this.SYMBOL_MAXICODE_MODE_5 = "maxicode_mode_5";
        this.SYMBOL_MAXICODE_MODE_6 = "maxicode_mode_6";
        this.SYMBOL_GS1_DATABAR_STACKED = "gs1_databar_stacked";
        this.SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL =
            "gs1_databar_stacked_omnidirectional";
        this.SYMBOL_GS1_DATABAR_EXPANDED_STACKED =
            "gs1_databar_expanded_stacked";
        this.SYMBOL_AZTECCODE_FULLRANGE = "azteccode_fullrange";
        this.SYMBOL_AZTECCODE_COMPACT = "azteccode_compact";
        this.SYMBOL_DATAMATRIX_SQUARE = "datamatrix_square";
        this.SYMBOL_DATAMATRIX_RECTANGLE_8 = "datamatrix_rectangle_8";
        this.SYMBOL_DATAMATRIX_RECTANGLE_12 = "datamatrix_rectangle_12";
        this.SYMBOL_DATAMATRIX_RECTANGLE_16 = "datamatrix_rectangle_16";
        this.LEVEL_0 = "level_0";
        this.LEVEL_1 = "level_1";
        this.LEVEL_2 = "level_2";
        this.LEVEL_3 = "level_3";
        this.LEVEL_4 = "level_4";
        this.LEVEL_5 = "level_5";
        this.LEVEL_6 = "level_6";
        this.LEVEL_7 = "level_7";
        this.LEVEL_8 = "level_8";
        this.LEVEL_L = "level_l";
        this.LEVEL_M = "level_m";
        this.LEVEL_Q = "level_q";
        this.LEVEL_H = "level_h";
        this.LEVEL_DEFAULT = "default";
        this.LINE_THIN = "thin";
        this.LINE_MEDIUM = "medium";
        this.LINE_THICK = "thick";
        this.LINE_THIN_DOUBLE = "thin_double";
        this.LINE_MEDIUM_DOUBLE = "medium_double";
        this.LINE_THICK_DOUBLE = "thick_double";
        this.DIRECTION_LEFT_TO_RIGHT = "left_to_right";
        this.DIRECTION_BOTTOM_TO_TOP = "bottom_to_top";
        this.DIRECTION_RIGHT_TO_LEFT = "right_to_left";
        this.DIRECTION_TOP_TO_BOTTOM = "top_to_bottom";
        this.CUT_NO_FEED = "no_feed";
        this.CUT_FEED = "feed";
        this.CUT_RESERVE = "reserve";
        this.DRAWER_1 = "drawer_1";
        this.DRAWER_2 = "drawer_2";
        this.PULSE_100 = "pulse_100";
        this.PULSE_200 = "pulse_200";
        this.PULSE_300 = "pulse_300";
        this.PULSE_400 = "pulse_400";
        this.PULSE_500 = "pulse_500";
        this.PATTERN_NONE = "none";
        this.PATTERN_1 = "pattern_1";
        this.PATTERN_2 = "pattern_2";
        this.PATTERN_3 = "pattern_3";
        this.PATTERN_4 = "pattern_4";
        this.PATTERN_5 = "pattern_5";
        this.PATTERN_6 = "pattern_6";
        this.PATTERN_7 = "pattern_7";
        this.PATTERN_8 = "pattern_8";
        this.PATTERN_9 = "pattern_9";
        this.PATTERN_10 = "pattern_10";
        this.PATTERN_A = "pattern_a";
        this.PATTERN_B = "pattern_b";
        this.PATTERN_C = "pattern_c";
        this.PATTERN_D = "pattern_d";
        this.PATTERN_E = "pattern_e";
        this.PATTERN_ERROR = "error";
        this.PATTERN_PAPER_END = "paper_end";
        this.LAYOUT_RECEIPT = "receipt";
        this.LAYOUT_RECEIPT_BM = "receipt_bm";
        this.LAYOUT_LABEL = "label";
        this.LAYOUT_LABEL_BM = "label_bm";
        this.HALFTONE_DITHER = 0;
        this.HALFTONE_ERROR_DIFFUSION = 1;
        this.HALFTONE_THRESHOLD = 2;
    }
    ePOSBuilder.prototype.addText = function (data) {
        this.message += "<text>" + escapeMarkup(data) + "</text>";
        return this;
    };
    ePOSBuilder.prototype.addTextLang = function (lang) {
        this.message += '<text lang="' + lang + '"/>';
        return this;
    };
    ePOSBuilder.prototype.addTextAlign = function (align) {
        var s = "";
        s += getEnumAttr("align", align, regexAlign);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextRotate = function (rotate) {
        var s = "";
        s += getBoolAttr("rotate", rotate);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextLineSpace = function (linespc) {
        var s = "";
        s += getUByteAttr("linespc", linespc);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextFont = function (font) {
        var s = "";
        s += getEnumAttr("font", font, regexFont);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextSmooth = function (smooth) {
        var s = "";
        s += getBoolAttr("smooth", smooth);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextDouble = function (dw, dh) {
        var s = "";
        if (dw !== undefined) {
            s += getBoolAttr("dw", dw);
        }
        if (dh !== undefined) {
            s += getBoolAttr("dh", dh);
        }
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextSize = function (width, height) {
        var s = "";
        if (width !== undefined) {
            s += getIntAttr("width", width, 1, 8);
        }
        if (height !== undefined) {
            s += getIntAttr("height", height, 1, 8);
        }
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextStyle = function (reverse, ul, em, color) {
        var s = "";
        if (reverse !== undefined) {
            s += getBoolAttr("reverse", reverse);
        }
        if (ul !== undefined) {
            s += getBoolAttr("ul", ul);
        }
        if (em !== undefined) {
            s += getBoolAttr("em", em);
        }
        if (color !== undefined) {
            s += getEnumAttr("color", color, regexColor);
        }
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextPosition = function (x) {
        var s = "";
        s += getUShortAttr("x", x);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addTextVPosition = function (y) {
        var s = "";
        s += getUShortAttr("y", y);
        this.message += "<text" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addFeedUnit = function (unit) {
        var s = "";
        s += getUByteAttr("unit", unit);
        this.message += "<feed" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addFeedLine = function (line) {
        var s = "";
        s += getUByteAttr("line", line);
        this.message += "<feed" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addFeed = function () {
        this.message += "<feed/>";
        return this;
    };
    ePOSBuilder.prototype.addFeedPosition = function (pos) {
        var s = "";
        s += getEnumAttr("pos", pos, regexFeed);
        this.message += "<feed" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addImage = function (
        context,
        x,
        y,
        width,
        height,
        color,
        mode
    ) {
        var s = "",
            ht = this.halftone,
            br = this.brightness,
            imgdata,
            raster;
        getUShortAttr("x", x);
        getUShortAttr("y", y);
        s += getUShortAttr("width", width);
        s += getUShortAttr("height", height);
        if (color !== undefined) {
            s += getEnumAttr("color", color, regexColor);
        }
        if (mode !== undefined) {
            s += getEnumAttr("mode", mode, regexMode);
        }
        if (isNaN(ht) || ht < 0 || ht > 2) {
            throw new Error('Property "halftone" is invalid');
        }
        if (isNaN(br) || br < 0.1 || br > 10) {
            throw new Error('Property "brightness" is invalid');
        }
        imgdata = context.getImageData(x, y, width, height);
        raster =
            mode == this.MODE_GRAY16
                ? toGrayImage(imgdata, br)
                : toMonoImage(imgdata, ht, br);
        this.message +=
            "<image" + s + ">" + toBase64Binary(raster) + "</image>";
        return this;
    };
    ePOSBuilder.prototype.addLogo = function (key1, key2) {
        var s = "";
        s += getUByteAttr("key1", key1);
        s += getUByteAttr("key2", key2);
        this.message += "<logo" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addBarcode = function (
        data,
        type,
        hri,
        font,
        width,
        height
    ) {
        var s = "";
        s += getEnumAttr("type", type, regexBarcode);
        if (hri !== undefined) {
            s += getEnumAttr("hri", hri, regexHri);
        }
        if (font !== undefined) {
            s += getEnumAttr("font", font, regexFont);
        }
        if (width !== undefined) {
            s += getUByteAttr("width", width);
        }
        if (height !== undefined) {
            s += getUByteAttr("height", height);
        }
        this.message +=
            "<barcode" +
            s +
            ">" +
            escapeControl(escapeMarkup(data)) +
            "</barcode>";
        return this;
    };
    ePOSBuilder.prototype.addSymbol = function (
        data,
        type,
        level,
        width,
        height,
        size
    ) {
        var s = "";
        s += getEnumAttr("type", type, regexSymbol);
        if (level !== undefined) {
            s += getEnumIntAttr("level", level, regexLevel, 0, 255);
        }
        if (width !== undefined) {
            s += getUByteAttr("width", width);
        }
        if (height !== undefined) {
            s += getUByteAttr("height", height);
        }
        if (size !== undefined) {
            s += getUShortAttr("size", size);
        }
        this.message +=
            "<symbol" +
            s +
            ">" +
            escapeControl(escapeMarkup(data)) +
            "</symbol>";
        return this;
    };
    ePOSBuilder.prototype.addHLine = function (x1, x2, style) {
        var s = "";
        s += getUShortAttr("x1", x1);
        s += getUShortAttr("x2", x2);
        if (style !== undefined) {
            s += getEnumAttr("style", style, regexLine);
        }
        this.message += "<hline" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addVLineBegin = function (x, style) {
        var s = "";
        s += getUShortAttr("x", x);
        if (style !== undefined) {
            s += getEnumAttr("style", style, regexLine);
        }
        this.message += "<vline-begin" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addVLineEnd = function (x, style) {
        var s = "";
        s += getUShortAttr("x", x);
        if (style !== undefined) {
            s += getEnumAttr("style", style, regexLine);
        }
        this.message += "<vline-end" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addPageBegin = function () {
        this.message += "<page>";
        return this;
    };
    ePOSBuilder.prototype.addPageEnd = function () {
        this.message += "</page>";
        return this;
    };
    ePOSBuilder.prototype.addPageArea = function (x, y, width, height) {
        var s = "";
        s += getUShortAttr("x", x);
        s += getUShortAttr("y", y);
        s += getUShortAttr("width", width);
        s += getUShortAttr("height", height);
        this.message += "<area" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addPageDirection = function (dir) {
        var s = "";
        s += getEnumAttr("dir", dir, regexDirection);
        this.message += "<direction" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addPagePosition = function (x, y) {
        var s = "";
        s += getUShortAttr("x", x);
        s += getUShortAttr("y", y);
        this.message += "<position" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addPageLine = function (x1, y1, x2, y2, style) {
        var s = "";
        s += getUShortAttr("x1", x1);
        s += getUShortAttr("y1", y1);
        s += getUShortAttr("x2", x2);
        s += getUShortAttr("y2", y2);
        if (style !== undefined) {
            s += getEnumAttr("style", style, regexLine);
        }
        this.message += "<line" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
        var s = "";
        s += getUShortAttr("x1", x1);
        s += getUShortAttr("y1", y1);
        s += getUShortAttr("x2", x2);
        s += getUShortAttr("y2", y2);
        if (style !== undefined) {
            s += getEnumAttr("style", style, regexLine);
        }
        this.message += "<rectangle" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addCut = function (type) {
        var s = "";
        if (type !== undefined) {
            s += getEnumAttr("type", type, regexCut);
        }
        this.message += "<cut" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addPulse = function (drawer, time) {
        var s = "";
        if (drawer !== undefined) {
            s += getEnumAttr("drawer", drawer, regexDrawer);
        }
        if (time !== undefined) {
            s += getEnumAttr("time", time, regexPulse);
        }
        this.message += "<pulse" + s + "/>";
        console.log(this.message)
        return this;
    };
    ePOSBuilder.prototype.addSound = function (pattern, repeat, cycle) {
        var s = "";
        if (pattern !== undefined) {
            s += getEnumAttr("pattern", pattern, regexPattern);
        }
        if (repeat !== undefined) {
            s += getUByteAttr("repeat", repeat);
        }
        if (cycle !== undefined) {
            s += getUShortAttr("cycle", cycle);
        }
        this.message += "<sound" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addLayout = function (
        type,
        width,
        height,
        margin_top,
        margin_bottom,
        offset_cut,
        offset_label
    ) {
        var s = "";
        s += getEnumAttr("type", type, regexLayout);
        if (width !== undefined) {
            s += getUShortAttr("width", width);
        }
        if (height !== undefined) {
            s += getUShortAttr("height", height);
        }
        if (margin_top !== undefined) {
            s += getShortAttr("margin-top", margin_top);
        }
        if (margin_bottom !== undefined) {
            s += getShortAttr("margin-bottom", margin_bottom);
        }
        if (offset_cut !== undefined) {
            s += getShortAttr("offset-cut", offset_cut);
        }
        if (offset_label !== undefined) {
            s += getShortAttr("offset-label", offset_label);
        }
        this.message += "<layout" + s + "/>";
        return this;
    };
    ePOSBuilder.prototype.addRecovery = function () {
        this.message += "<recovery/>";
        return this;
    };
    ePOSBuilder.prototype.addReset = function () {
        this.message += "<reset/>";
        return this;
    };
    ePOSBuilder.prototype.addCommand = function (data) {
        this.message += "<command>" + toHexBinary(data) + "</command>";
        return this;
    };
    ePOSBuilder.prototype.toString = function () {
        var s = "";
        if (this.force) {
            s += getBoolAttr("force", true);
        }
        return (
            '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"' +
            s +
            ">" +
            this.message +
            "</epos-print>"
        );
    };
    function toHexBinary(s) {
        var l = s.length,
            r = new Array(l),
            i;
        for (i = 0; i < l; i++) {
            r[i] = ("0" + s.charCodeAt(i).toString(16)).slice(-2);
        }
        return r.join("");
    }
    function toBase64Binary(s) {
        var l = s.length,
            r = new Array(((l + 2) / 3) << 2),
            t =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            p = (3 - (l % 3)) % 3,
            j = 0,
            i = 0,
            n;
        s += "\x00\x00";
        while (i < l) {
            n =
                (s.charCodeAt(i++) << 16) |
                (s.charCodeAt(i++) << 8) |
                s.charCodeAt(i++);
            r[j++] = t.charAt((n >> 18) & 63);
            r[j++] = t.charAt((n >> 12) & 63);
            r[j++] = t.charAt((n >> 6) & 63);
            r[j++] = t.charAt(n & 63);
        }
        while (p--) {
            r[--j] = "=";
        }
        return r.join("");
    }
    function toMonoImage(imgdata, s, g) {
        var x = String.fromCharCode,
            m8 = [
                [2, 130, 34, 162, 10, 138, 42, 170],
                [194, 66, 226, 98, 202, 74, 234, 106],
                [50, 178, 18, 146, 58, 186, 26, 154],
                [242, 114, 210, 82, 250, 122, 218, 90],
                [14, 142, 46, 174, 6, 134, 38, 166],
                [206, 78, 238, 110, 198, 70, 230, 102],
                [62, 190, 30, 158, 54, 182, 22, 150],
                [254, 126, 222, 94, 246, 118, 214, 86],
            ],
            d = imgdata.data,
            w = imgdata.width,
            h = imgdata.height,
            r = new Array(((w + 7) >> 3) * h),
            n = 0,
            p = 0,
            q = 0,
            t = 128,
            e = new Array(),
            e1,
            e2,
            b,
            v,
            f,
            i,
            j;
        if (s == 1) {
            i = w;
            while (i--) {
                e.push(0);
            }
        }
        for (j = 0; j < h; j++) {
            e1 = 0;
            e2 = 0;
            i = 0;
            while (i < w) {
                b = i & 7;
                if (s == 0) {
                    t = m8[j & 7][b];
                }
                v =
                    (Math.pow(
                        (((d[p++] * 0.29891 +
                            d[p++] * 0.58661 +
                            d[p++] * 0.11448) *
                            d[p]) /
                            255 +
                            255 -
                            d[p++]) /
                            255,
                        1 / g
                    ) *
                        255) |
                    0;
                if (s == 1) {
                    v += (e[i] + e1) >> 4;
                    f = v - (v < t ? 0 : 255);
                    if (i > 0) {
                        e[i - 1] += f;
                    }
                    e[i] = f * 7 + e2;
                    e1 = f * 5;
                    e2 = f * 3;
                }
                if (v < t) {
                    n |= 128 >> b;
                }
                i++;
                if (b == 7 || i == w) {
                    r[q++] = x(n == 16 ? 32 : n);
                    n = 0;
                }
            }
        }
        return r.join("");
    }
    function toGrayImage(imgdata, g) {
        var x = String.fromCharCode,
            m4 = [
                [0, 9, 2, 11],
                [13, 4, 15, 6],
                [3, 12, 1, 10],
                [16, 7, 14, 5],
            ],
            thermal = [
                0, 7, 13, 19, 23, 27, 31, 35, 40, 44, 49, 52, 54, 55, 57, 59,
                61, 62, 64, 66, 67, 69, 70, 70, 71, 72, 73, 74, 75, 76, 77, 78,
                79, 80, 81, 82, 83, 83, 84, 85, 86, 86, 87, 88, 88, 89, 90, 90,
                91, 91, 92, 93, 93, 94, 94, 95, 96, 96, 97, 98, 98, 99, 99, 100,
                101, 101, 102, 102, 103, 103, 104, 104, 105, 105, 106, 106, 107,
                107, 108, 108, 109, 109, 110, 110, 111, 111, 112, 112, 112, 113,
                113, 114, 114, 115, 115, 116, 116, 117, 117, 118, 118, 119, 119,
                120, 120, 120, 121, 121, 122, 122, 123, 123, 123, 124, 124, 125,
                125, 125, 126, 126, 127, 127, 127, 128, 128, 129, 129, 130, 130,
                130, 131, 131, 132, 132, 132, 133, 133, 134, 134, 135, 135, 135,
                136, 136, 137, 137, 137, 138, 138, 139, 139, 139, 140, 140, 141,
                141, 141, 142, 142, 143, 143, 143, 144, 144, 145, 145, 146, 146,
                146, 147, 147, 148, 148, 148, 149, 149, 150, 150, 150, 151, 151,
                152, 152, 152, 153, 153, 154, 154, 155, 155, 155, 156, 156, 157,
                157, 158, 158, 159, 159, 160, 160, 161, 161, 161, 162, 162, 163,
                163, 164, 164, 165, 165, 166, 166, 166, 167, 167, 168, 168, 169,
                169, 170, 170, 171, 171, 172, 173, 173, 174, 175, 175, 176, 177,
                178, 178, 179, 180, 180, 181, 182, 182, 183, 184, 184, 185, 186,
                186, 187, 189, 191, 193, 195, 198, 200, 202, 255,
            ],
            d = imgdata.data,
            w = imgdata.width,
            h = imgdata.height,
            r = new Array(((w + 1) >> 1) * h),
            n = 0,
            p = 0,
            q = 0,
            b,
            v,
            v1,
            i,
            j;
        for (j = 0; j < h; j++) {
            i = 0;
            while (i < w) {
                b = i & 1;
                v =
                    thermal[
                        (Math.pow(
                            (((d[p++] * 0.29891 +
                                d[p++] * 0.58661 +
                                d[p++] * 0.11448) *
                                d[p]) /
                                255 +
                                255 -
                                d[p++]) /
                                255,
                            1 / g
                        ) *
                            255) |
                            0
                    ];
                v1 = (v / 17) | 0;
                if (m4[j & 3][i & 3] < v % 17) {
                    v1++;
                }
                n |= v1 << ((1 - b) << 2);
                i++;
                if (b == 1 || i == w) {
                    r[q++] = x(n);
                    n = 0;
                }
            }
        }
        return r.join("");
    }
    function escapeMarkup(s) {
        var markup = /[<>&'"\t\n\r]/g;
        if (markup.test(s)) {
            s = s.replace(markup, function (c) {
                var r = "";
                switch (c) {
                    case "<":
                        r = "&lt;";
                        break;
                    case ">":
                        r = "&gt;";
                        break;
                    case "&":
                        r = "&amp;";
                        break;
                    case "'":
                        r = "&apos;";
                        break;
                    case '"':
                        r = "&quot;";
                        break;
                    case "\t":
                        r = "&#9;";
                        break;
                    case "\n":
                        r = "&#10;";
                        break;
                    case "\r":
                        r = "&#13;";
                        break;
                    default:
                        break;
                }
                return r;
            });
        }
        return s;
    }
    function escapeControl(s) {
        var control = /[\\\x00-\x1f\x7f-\xff]/g;
        if (control.test(s)) {
            s = s.replace(control, function (c) {
                return c == "\\"
                    ? "\\\\"
                    : "\\x" + ("0" + c.charCodeAt(0).toString(16)).slice(-2);
            });
        }
        return s;
    }
    var regexFont = /^(font_[a-e]|special_[ab])$/,
        regexAlign = /^(left|center|right)$/,
        regexColor = /^(none|color_[1-4])$/,
        regexFeed = /^(peeling|cutting|current_tof|next_tof)$/,
        regexMode = /^(mono|gray16)$/,
        regexBarcode =
            /^(upc_[ae]|[ej]an13|[ej]an8|code(39|93|128)|itf|codabar|gs1_128|gs1_databar_(omnidirectional|truncated|limited|expanded))$/,
        regexHri = /^(none|above|below|both)$/,
        regexSymbol =
            /^(pdf417_(standard|truncated)|qrcode_(model_[12]|micro)|maxicode_mode_[2-6]|gs1_databar_(stacked(_omnidirectional)?|expanded_stacked)|azteccode_(fullrange|compact)|datamatrix_(square|rectangle_(8|12|16)))$/,
        regexLevel = /^(level_[0-8lmqh]|default)$/,
        regexLine = /^(thin|medium|thick)(_double)?$/,
        regexDirection =
            /^(left_to_right|bottom_to_top|right_to_left|top_to_bottom)$/,
        regexCut = /^(no_feed|feed|reserve)$/,
        regexDrawer = /^drawer_[12]$/,
        regexPulse = /^pulse_[1-5]00$/,
        regexPattern = /^(none|pattern_(10|[1-9a-e])|error|paper_end)$/,
        regexLayout = /^(receipt|label)(_bm)?$/;
    function getEnumAttr(name, value, regex) {
        if (!regex.test(value)) {
            throw new Error('Parameter "' + name + '" is invalid');
        }
        return " " + name + '="' + value + '"';
    }
    function getBoolAttr(name, value) {
        return " " + name + '="' + !!value + '"';
    }
    function getIntAttr(name, value, min, max) {
        if (isNaN(value) || value < min || value > max) {
            throw new Error('Parameter "' + name + '" is invalid');
        }
        return " " + name + '="' + value + '"';
    }
    function getUByteAttr(name, value) {
        return getIntAttr(name, value, 0, 255);
    }
    function getUShortAttr(name, value) {
        return getIntAttr(name, value, 0, 65535);
    }
    function getShortAttr(name, value) {
        return getIntAttr(name, value, -32768, 32767);
    }
    function getEnumIntAttr(name, value, regex, min, max) {
        if (!regex.test(value)) {
            if (isNaN(value) || value < min || value > max) {
                throw new Error('Parameter "' + name + '" is invalid');
            }
        }
        return " " + name + '="' + value + '"';
    }
    function ePOSPrint(address) {
        this.address = address;
        this.enabled = false;
        this.interval = 3000;
        this.timeout = 300000;
        this.status = 0;
        this.battery = 0;
        this.onreceive = null;
        this.onerror = null;
        this.onstatuschange = null;
        this.ononline = null;
        this.onoffline = null;
        this.onpoweroff = null;
        this.oncoverok = null;
        this.oncoveropen = null;
        this.onpaperok = null;
        this.onpaperend = null;
        this.onpapernearend = null;
        this.ondrawerclosed = null;
        this.ondraweropen = null;
        this.onbatterylow = null;
        this.onbatteryok = null;
        this.onbatterystatuschange = null;
        this.ASB_NO_RESPONSE = 1;
        this.ASB_PRINT_SUCCESS = 2;
        this.ASB_DRAWER_KICK = 4;
        this.ASB_BATTERY_OFFLINE = 4;
        this.ASB_OFF_LINE = 8;
        this.ASB_COVER_OPEN = 32;
        this.ASB_PAPER_FEED = 64;
        this.ASB_WAIT_ON_LINE = 256;
        this.ASB_PANEL_SWITCH = 512;
        this.ASB_MECHANICAL_ERR = 1024;
        this.ASB_AUTOCUTTER_ERR = 2048;
        this.ASB_UNRECOVER_ERR = 8192;
        this.ASB_AUTORECOVER_ERR = 16384;
        this.ASB_RECEIPT_NEAR_END = 131072;
        this.ASB_RECEIPT_END = 524288;
        this.ASB_BUZZER = 16777216;
        this.ASB_WAIT_REMOVE_LABEL = 16777216;
        this.ASB_NO_LABEL = 67108864;
        this.ASB_SPOOLER_IS_STOPPED = 2147483648;
    }
    ePOSPrint.prototype.open = function () {
        if (!this.enabled) {
            this.enabled = true;
            this.status = 0;
            this.battery = 0;
            this.send();
        }
    };
    ePOSPrint.prototype.close = function () {
        this.enabled = false;
        if (this.intervalid) {
            clearTimeout(this.intervalid);
            delete this.intervalid;
        }
        if (this.intervalxhr) {
            this.intervalxhr.abort();
            delete this.intervalxhr;
        }
    };
    ePOSPrint.prototype.getPrintJobStatus = function (printjobid) {
        this.send(printjobid);
    };
    ePOSPrint.prototype.send = function (request, printjobid) {
        var args = arguments.length,
            epos = this,
            address = epos.address,
            soap,
            xhr,
            tid,
            res,
            success,
            code,
            status,
            battery;
        if (!/^<epos/.test(request)) {
            if (args < 2) {
                printjobid = request;
                request = new ePOSBuilder().toString();
            } else {
                address = request;
                request = printjobid;
                printjobid = arguments[2];
            }
        }
        soap =
            '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';
        if (printjobid) {
            soap +=
                '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' +
                printjobid +
                "</printjobid></parameter></s:Header>";
        }
        soap += "<s:Body>" + request + "</s:Body></s:Envelope>";
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            if (!("withCredentials" in xhr) && window.XDomainRequest) {
                xhr = new XDomainRequest();
                xhr.open("POST", address, true);
                xhr.onload = function () {
                    res = xhr.responseText;
                    if (/response/.test(res)) {
                        success = /success\s*=\s*"\s*(1|true)\s*"/.test(res);
                        code = res.match(/code\s*=\s*"\s*(\S*)\s*"/)
                            ? RegExp.$1
                            : "";
                        status = res.match(/status\s*=\s*"\s*(\d+)\s*"/)
                            ? parseInt(RegExp.$1)
                            : 0;
                        battery = res.match(/battery\s*=\s*"\s*(\d+)\s*"/)
                            ? parseInt(RegExp.$1)
                            : 0;
                        printjobid = res.match(
                            /<printjobid>\s*(\S*)\s*<\/printjobid>/
                        )
                            ? RegExp.$1
                            : "";
                        if (args > 0) {
                            fireReceiveEvent(
                                epos,
                                success,
                                code,
                                status,
                                battery,
                                printjobid
                            );
                        } else {
                            fireStatusEvent(epos, status, battery);
                        }
                    } else {
                        if (args > 0) {
                            fireErrorEvent(epos, 0, xhr.responseText);
                        } else {
                            fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
                        }
                    }
                    if (args < 1) {
                        updateStatus(epos);
                    }
                };
                xhr.onerror = function () {
                    if (args > 0) {
                        fireErrorEvent(epos, 0, xhr.responseText);
                    } else {
                        fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
                        updateStatus(epos);
                    }
                };
                xhr.onprogress = function () {};
                xhr.ontimeout = xhr.onerror;
                xhr.timeout = epos.timeout;
                xhr.send(soap);
            } else {
                xhr.open("POST", address, true);
                xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
                xhr.setRequestHeader(
                    "If-Modified-Since",
                    "Thu, 01 Jan 1970 00:00:00 GMT"
                );
                xhr.setRequestHeader("SOAPAction", '""');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        clearTimeout(tid);
                        if (xhr.status == 200 && xhr.responseXML) {
                            res =
                                xhr.responseXML.getElementsByTagName(
                                    "response"
                                );
                            if (res.length > 0) {
                                success = /^(1|true)$/.test(
                                    res[0].getAttribute("success")
                                );
                                code = res[0].hasAttribute("code")
                                    ? res[0].getAttribute("code")
                                    : "";
                                status = res[0].hasAttribute("status")
                                    ? parseInt(res[0].getAttribute("status"))
                                    : 0;
                                battery = res[0].hasAttribute("battery")
                                    ? parseInt(res[0].getAttribute("battery"))
                                    : 0;
                                res =
                                    xhr.responseXML.getElementsByTagName(
                                        "printjobid"
                                    );
                                printjobid =
                                    res.length > 0 ? res[0].textContent : "";
                                if (args > 0) {
                                    fireReceiveEvent(
                                        epos,
                                        success,
                                        code,
                                        status,
                                        battery,
                                        printjobid
                                    );
                                } else {
                                    fireStatusEvent(epos, status, battery);
                                }
                            } else {
                                if (args > 0) {
                                    fireErrorEvent(
                                        epos,
                                        xhr.status,
                                        xhr.responseText
                                    );
                                } else {
                                    fireStatusEvent(
                                        epos,
                                        epos.ASB_NO_RESPONSE,
                                        0
                                    );
                                }
                            }
                        } else {
                            if (args > 0) {
                                fireErrorEvent(
                                    epos,
                                    xhr.status,
                                    xhr.responseText
                                );
                            } else {
                                fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
                            }
                        }
                        if (args < 1) {
                            updateStatus(epos);
                        }
                    }
                };
                tid = setTimeout(function () {
                    xhr.abort();
                }, epos.timeout);
                xhr.send(soap);
            }
            if (args < 1) {
                epos.intervalxhr = xhr;
            }
        } else {
            throw new Error("XMLHttpRequest is not supported");
        }
    };
    function fireReceiveEvent(
        epos,
        success,
        code,
        status,
        battery,
        printjobid
    ) {
        if (epos.onreceive) {
            epos.onreceive({
                success: success,
                code: code,
                status: status,
                battery: battery,
                printjobid: printjobid,
            });
        }
    }
    function fireStatusEvent(epos, status, battery) {
        var diff, difb;
        if (status == 0 || status == epos.ASB_NO_RESPONSE) {
            status = epos.status | epos.ASB_NO_RESPONSE;
        }
        diff = epos.status == 0 ? ~0 : epos.status ^ status;
        difb = epos.status == 0 ? ~0 : epos.battery ^ battery;
        epos.status = status;
        epos.battery = battery;
        if (diff && epos.onstatuschange) {
            epos.onstatuschange(status);
        }
        if (difb && epos.onbatterystatuschange) {
            epos.onbatterystatuschange(battery);
        }
        if (diff & (epos.ASB_NO_RESPONSE | epos.ASB_OFF_LINE)) {
            if (status & epos.ASB_NO_RESPONSE) {
                if (epos.onpoweroff) {
                    epos.onpoweroff();
                }
            } else {
                if (status & epos.ASB_OFF_LINE) {
                    if (epos.onoffline) {
                        epos.onoffline();
                    }
                } else {
                    if (epos.ononline) {
                        epos.ononline();
                    }
                }
            }
        }
        if (diff & epos.ASB_COVER_OPEN) {
            if (status & epos.ASB_NO_RESPONSE) {
            } else {
                if (status & epos.ASB_COVER_OPEN) {
                    if (epos.oncoveropen) {
                        epos.oncoveropen();
                    }
                } else {
                    if (epos.oncoverok) {
                        epos.oncoverok();
                    }
                }
            }
        }
        if (diff & (epos.ASB_RECEIPT_END | epos.ASB_RECEIPT_NEAR_END)) {
            if (status & epos.ASB_NO_RESPONSE) {
            } else {
                if (status & epos.ASB_RECEIPT_END) {
                    if (epos.onpaperend) {
                        epos.onpaperend();
                    }
                } else {
                    if (status & epos.ASB_RECEIPT_NEAR_END) {
                        if (epos.onpapernearend) {
                            epos.onpapernearend();
                        }
                    } else {
                        if (epos.onpaperok) {
                            epos.onpaperok();
                        }
                    }
                }
            }
        }
        if (diff & epos.ASB_DRAWER_KICK) {
            if (status & epos.ASB_NO_RESPONSE) {
            } else {
                if (status & epos.ASB_DRAWER_KICK) {
                    if (epos.ondrawerclosed) {
                        epos.ondrawerclosed();
                    }
                    if (epos.onbatterylow) {
                        epos.onbatterylow();
                    }
                } else {
                    if (epos.ondraweropen) {
                        epos.ondraweropen();
                    }
                    if (epos.onbatteryok) {
                        epos.onbatteryok();
                    }
                }
            }
        }
    }
    function fireErrorEvent(epos, status, responseText) {
        if (epos.onerror) {
            epos.onerror({ status: status, responseText: responseText });
        }
    }
    function updateStatus(epos) {
        var delay = epos.interval;
        if (epos.enabled) {
            if (isNaN(delay) || delay < 1000) {
                delay = 3000;
            }
            epos.intervalid = setTimeout(function () {
                delete epos.intervalid;
                if (epos.enabled) {
                    epos.send();
                }
            }, delay);
        }
        delete epos.intervalxhr;
    }
    function CanvasPrint(address) {
        this.address = address;
        this.mode = "mono";
        this.halftone = 0;
        this.brightness = 1;
        this.align = "left";
        this.color = "color_1";
        this.paper = "receipt";
        this.feed = "current_tof";
        this.cut = false;
        this.layout = null;
        this.ALIGN_LEFT = "left";
        this.ALIGN_CENTER = "center";
        this.ALIGN_RIGHT = "right";
        this.COLOR_NONE = "none";
        this.COLOR_1 = "color_1";
        this.COLOR_2 = "color_2";
        this.COLOR_3 = "color_3";
        this.COLOR_4 = "color_4";
        this.FEED_PEELING = "peeling";
        this.FEED_CUTTING = "cutting";
        this.FEED_CURRENT_TOF = "current_tof";
        this.FEED_NEXT_TOF = "next_tof";
        this.HALFTONE_DITHER = 0;
        this.HALFTONE_ERROR_DIFFUSION = 1;
        this.HALFTONE_THRESHOLD = 2;
        this.MODE_MONO = "mono";
        this.MODE_GRAY16 = "gray16";
        this.PAPER_RECEIPT = "receipt";
        this.PAPER_RECEIPT_BM = "receipt_bm";
        this.PAPER_LABEL = "label";
        this.PAPER_LABEL_BM = "label_bm";
    }
    CanvasPrint.prototype = new ePOSPrint();
    CanvasPrint.prototype.constructor = CanvasPrint;
    CanvasPrint.prototype.print = function (canvas, printjobid) {
        var args = arguments.length,
            address = this.address,
            cut = this.cut,
            mode = this.mode,
            layout = this.layout,
            paper = this.paper,
            builder = new ePOSBuilder(),
            i = 2;
        if (!canvas.getContext) {
            address = canvas;
            canvas = printjobid;
            printjobid = arguments[i++];
            if (!canvas.getContext) {
                throw new Error("Canvas is not supported");
            }
        }
        if (typeof printjobid == "boolean") {
            cut = printjobid;
            printjobid = undefined;
            if (i < args) {
                mode = arguments[i++];
            }
        }
        if (layout) {
            builder.addLayout(
                paper,
                layout.width,
                layout.height,
                layout.margin_top,
                layout.margin_bottom,
                layout.offset_cut,
                layout.offset_label
            );
        }
        if (paper != this.PAPER_RECEIPT) {
            builder.addFeedPosition(builder.FEED_CURRENT_TOF);
            if (layout) {
                builder.addFeedPosition(builder.FEED_NEXT_TOF);
            }
        }
        builder.addTextAlign(this.align);
        builder.halftone = this.halftone;
        builder.brightness = this.brightness;
        builder.addImage(
            canvas.getContext("2d"),
            0,
            0,
            canvas.width,
            canvas.height,
            this.color,
            mode
        );
        if (paper != this.PAPER_RECEIPT) {
            builder.addFeedPosition(this.feed);
            if (cut) {
                builder.addCut(builder.CUT_NO_FEED);
            }
        } else {
            if (cut) {
                builder.addCut(builder.CUT_FEED);
            }
        }
        this.send(address, builder.toString(), printjobid);
    };
    CanvasPrint.prototype.recover = function () {
        var builder = new ePOSBuilder();
        builder.force = true;
        builder.addRecovery();
        this.send(this.address, builder.toString());
    };
    CanvasPrint.prototype.reset = function () {
        var builder = new ePOSBuilder();
        builder.addReset();
        this.send(this.address, builder.toString());
    };
    if (!window.epson) {
        window.epson = {};
    }
    window.epson.ePOSBuilder = ePOSBuilder;
    window.epson.ePOSPrint = ePOSPrint;
    window.epson.CanvasPrint = CanvasPrint;
})(window);

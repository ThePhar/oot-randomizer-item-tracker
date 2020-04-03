/* eslint-disable */
const { app, BrowserWindow } = require("electron");
const path    = require("path");
const url     = require("url");
const express = require("express");
const expApp  = express();
const http    = require("http").createServer(expApp);
const io      = require("socket.io")(http);

let socket;

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 624,
        height: 384,
        frame: false,
        transparent: true,
        resizable: false,
        maximizable: false
});

    mainWindow.removeMenu();
    // mainWindow.loadURL("http://localhost:3000");
    const startURL = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, "/../build/index.html"),
        protocol: "file:",
        slashes: true
    });
    mainWindow.loadURL(startURL);

    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

expApp.use(express.json());
expApp.post("/data", (req, res) => {
    printFancyConsole(req);

    if (socket) {
        socket.emit("FromAPI", buildJsonFromData(req.body));
    }

    res.send();
});

io.on("connection", (thisSocket) => {
    console.log("Connected to client application.");

    socket = thisSocket;
});

http.listen(9876, () => console.log("Listening on port *:9876"));

function ieee32ToFloat(intval) {
    var fval = 0.0;
    var x;//exponent
    var m;//mantissa
    var s;//sign
    s = (intval & 0x80000000)?-1:1;
    x = ((intval >> 23) & 0xFF);
    m = (intval & 0x7FFFFF);
    switch(x) {
        case 0:
            //zero, do nothing, ignore negative zero and subnormals
            break;
        case 0xFF:
            if (m) fval = NaN;
            else if (s > 0) fval = Number.POSITIVE_INFINITY;
            else fval = Number.NEGATIVE_INFINITY;
            break;
        default:
            x -= 127;
            m += 0x800000;
            fval = s * (m / 8388608.0) * Math.pow(2, x);
            break;
    }
    return fval;
}
function printFancyConsole(req) {
    const chalk = require("chalk");

    console.clear();
    let details = [];

    console.log(chalk.bgWhite.black(
        // 1234567890123456 12345678 --->
        "Raw Data Block   Hex      Converted Value                               "
    ));

    for (let value in req.body) {
        switch(value) {
            case "magic":
                details[value] = ((req.body[value] / 96) * 100) + "%";
                break;
            case "maxMagic":
                details[value] = req.body[value] ? "Level " + req.body[value] : "No Magic" ;
                break;
            case "linkState":
                if (req.body[value] === 0x4000000) {
                    details[value] = "YOU ARE A FOOL!";
                } else {
                    details[value] = "Not A Fool";
                }

                break;
            case "maxHealth":
                details[value] = "♥ " + (req.body[value] / 0x10);
                break;
            case "health":
                details[value] = "♥ " + (Math.floor(req.body[value] / 0x4) / 4);
                break;
            case "rupees":
                details[value] = "♦ " + req.body[value];
                break;

            case "statusByte1":
                const v = req.body[value];
                const string = "[" +
                    ((v & 0x1)  ? chalk.bgWhite.black("♪Ti") : "♪Ti") + " " +
                    ((v & 0x2)  ? chalk.bgWhite.black("♪St") : "♪St") + " " +
                    ((v & 0x4)  ? chalk.bgGreen.black("♣KE") : "♣KE") + " " +
                    ((v & 0x8)  ? chalk.bgRed.black("♣GR") : "♣GR") + " " +
                    ((v & 0x10) ? chalk.bgBlue.black("♣ZS") : "♣ZS") + " " +
                    ((v & 0x20) ? chalk.bgGray.black("◘SoA") : "◘SoA") + " " +
                    ((v & 0x40) ? chalk.bgGray.black("◘GC") : "◘GC") +
                    "]";

                details[value] = string;
                break;
            case "statusByte2":
                const w = req.body[value];
                const string2 = "[" +
                    ((w & 0x1)  ? chalk.bgBlue.black("♪Se") : "♪Se") + " " +
                    ((w & 0x2)  ? chalk.bgYellow.black("♪Re") : "♪Re") + " " +
                    ((w & 0x4)  ? chalk.bgMagenta.black("♪No") : "♪No") + " " +
                    ((w & 0x8)  ? chalk.bgCyan.black("♪Pr") : "♪Pr") + " " +
                    ((w & 0x10) ? chalk.bgWhite.black("♪Ze") : "♪Ze") + " " +
                    ((w & 0x20) ? chalk.bgWhite.black("♪Ep") : "♪Ep") + " " +
                    ((w & 0x40) ? chalk.bgWhite.black("♪Sa") : "♪Sa") + " " +
                    ((w & 0x80) ? chalk.bgWhite.black("♪Su") : "♪Su") +
                    "]";

                details[value] = string2;
                break;
            case "statusByte3":
                const x = req.body[value];
                const string3 = "[" +
                    ((x & 0x1)  ? chalk.bgGreen.black("○Fo") : "○Fo") + " " +
                    ((x & 0x2)  ? chalk.bgRed.black("○Fi") : "○Fi") + " " +
                    ((x & 0x4)  ? chalk.bgBlue.black("○Wa") : "○Wa") + " " +
                    ((x & 0x8)  ? chalk.bgYellow.black("○Sp") : "○Sp") + " " +
                    ((x & 0x10) ? chalk.bgMagenta.black("○Sh") : "○Sh") + " " +
                    ((x & 0x20) ? chalk.bgCyan.black("○Li") : "○Li") + " " +
                    ((x & 0x40) ? chalk.bgGreen.black("♪Mi") : "♪Mi") + " " +
                    ((x & 0x80) ? chalk.bgRed.black("♪Bo") : "♪Bo") +
                    "]";

                details[value] = string3;
                break;
            case "arms":
                const a = req.body[value];
                const string4 = "[" +
                    ((a & 0x1)  ? chalk.bgWhite.black("KoSw") : "KoSw") + " " +
                    ((a & 0x2)  ? chalk.bgWhite.black("MaSw") : "MaSw") + " " +
                    ((a & 0x4)  ? chalk.bgWhite.black("BiSw") : "BiSw") + " " +
                    ((a & 0x10) ? chalk.bgWhite.black("KoSh") : "KoSh") + " " +
                    ((a & 0x20) ? chalk.bgWhite.black("HySh") : "HySh") + " " +
                    ((a & 0x40) ? chalk.bgWhite.black("MiSh") : "MiSh") +
                    "]";

                details[value] = string4;
                break;
            case "clothing":
                const c = req.body[value];
                const string5 = "[" +
                    ((c & 0x1)  ? chalk.bgWhite.black("KoTu") : "KoTu") + " " +
                    ((c & 0x2)  ? chalk.bgWhite.black("GoTu") : "GoTu") + " " +
                    ((c & 0x4)  ? chalk.bgWhite.black("ZoTu") : "ZoTu") + " " +
                    ((c & 0x10) ? chalk.bgWhite.black("KoBt") : "KoBt") + " " +
                    ((c & 0x20) ? chalk.bgWhite.black("IrBt") : "IrBt") + " " +
                    ((c & 0x40) ? chalk.bgWhite.black("HvBt") : "HvBt") +
                    "]";

                details[value] = string5;
                break;
            case "dekuCapacity":
                const d = req.body[value];

                let dekuSticks, dekuNuts;

                if      (d & 0x8) { dekuSticks = "Stick Level 3"; }
                else if (d & 0x4) { dekuSticks = "Stick Level 2"; }
                else if (d & 0x2) { dekuSticks = "Stick Level 1"; }
                else              { dekuSticks = "No Sticks"; }

                if      (d & 0x20 && d & 0x10) { dekuNuts = "Nut Level 3"; }
                else if (d & 0x20) { dekuNuts = "Nut Level 2"; }
                else if (d & 0x10) { dekuNuts = "Nut Level 1"; }
                else               { dekuNuts = "No Nuts"; }

                details[value] = "[ " + dekuSticks + ", " + dekuNuts + " ]";
                break;
            case "bSWCapacity":
                const e = req.body[value];

                let scale, wallet, bullets;

                if      (e & 0x4) { scale = "Golden Scale"; }
                else if (e & 0x2) { scale = "Silver Scale"; }
                else              { scale = "Can't Swim!!"; }

                if      (e & 0x20 && e & 0x10) { wallet = "Tycoon's Wallet"; }
                else if (e & 0x20) { wallet = "Giant's Wallet"; }
                else if (e & 0x10) { wallet = "Adult's Wallet"; }
                else               { wallet = "Child's Wallet"; }

                if      (e & 0x80 && e & 0x40) { bullets = "Bullet Level 3"; }
                else if (e & 0x80) { bullets = "Bullet Level 2"; }
                else if (e & 0x40) { bullets = "Bullet Level 1"; }
                else               { bullets = "No Bullets"; }

                details[value] = "[ " + bullets + ", " + scale + ", " + wallet + " ]";
                break;
            case "qBSCapacity":
                const f = req.body[value];

                let quiver, bombs, lift;

                if      (f & 0x2 && f & 0x1) { quiver = "Quiver Level 3"; }
                else if (f & 0x2) { quiver = "Quiver Level 2"; }
                else if (f & 0x1) { quiver = "Quiver Level 1"; }
                else              { quiver = "No Quiver"; }

                if      (f & 0x10 && f & 0x8) { bombs = "Bombs Level 3"; }
                else if (f & 0x10) { bombs = "Bombs Level 2"; }
                else if (f & 0x8) { bombs = "Bombs Level 1"; }
                else               { bombs = "No Bombs"; }

                if      (f & 0x80 && f & 0x40) { lift = "Golden Gauntlets"; }
                else if (f & 0x80) { lift = "Silver Gauntlets"; }
                else if (f & 0x40) { lift = "Goron's Bracelet"; }
                else               { lift = "Weak Baby Arms"; }

                details[value] = "[ " + quiver + ", " + bombs + ", " + lift + " ]";
                break;
            case "deaths":
                details[value] = req.body[value] + " Deaths";
                break;
            case "skulltulas":
                details[value] = req.body[value] + " Skulltula Tokens";
                break;
            case "heartPieces":
                details[value] = req.body[value] / 16 + " Heart Pieces";
                break;
            case "x":
            case "y":
            case "z":
                details[value] = Math.round(ieee32ToFloat(req.body[value]));
                break;
        }

        console.log(
            value.padEnd(16),
            (("........" + req.body[value].toString(16).toUpperCase()).slice(-8)),
            details[value] !== undefined ? details[value] : req.body[value]
        );
    }
}

function parseInventoryItems(data) {
    const items = [];
    let safe = false;

    for (let i = 0; i < 24; i++) {
        items.push(getItemStats(data["slot_" + i], data));

        // If all the items are stick, it's a 0'd out memory, don't render all sticks!
        if (items[i] === null || items[i].itemName !== "stick")
            safe = true;
    }

    if (safe) {
        return items;
    } else {
        return [];
    }
}
function buildJsonFromData(data) {
    return {
        objectives: {
            skulltulaTokens: data["skulltulas"],
            triforcePieces: data["triforces"],
            emerald: !!(data["statusByte1"] & 0x4),
            ruby: !!(data["statusByte1"] & 0x8),
            sapphire: !!(data["statusByte1"] & 0x10),
            lightMedallion: !!(data["statusByte3"] & 0x20),
            forestMedallion: !!(data["statusByte3"] & 0x1),
            fireMedallion: !!(data["statusByte3"] & 0x2),
            waterMedallion: !!(data["statusByte3"] & 0x4),
            shadowMedallion: !!(data["statusByte3"] & 0x10),
            spiritMedallion: !!(data["statusByte3"] & 0x8),
        },
        rupees: data["rupees"],
        frozen: !!data["linkState"],
        items: parseInventoryItems(data),
        equipment: {
            swords: {
                kokiriSword: !!(data["arms"] & 0x1),
                masterSword: !!(data["arms"] & 0x2),
                bigSword: !!(data["arms"] & 0x4)
            },
            shields: {
                dekuShield: !!(data["arms"] & 0x10),
                hylianShield: !!(data["arms"] & 0x20),
                mirrorShield: !!(data["arms"] & 0x40),
            },
            tunics: {
                goronTunic: !!(data["clothing"] & 0x2),
                zoraTunic: !!(data["clothing"] & 0x4)
            },
            boots: {
                ironBoots: !!(data["clothing"] & 0x20),
                hoverBoots: !!(data["clothing"] & 0x40)
            }
        },
        keyItems: {
            gerudoCard: !!(data["statusByte1"] & 0x40),
            stoneOfAgony: !!(data["statusByte1"] & 0x20),
            liftLevel: (!!(data["qBSCapacity"] & 0x40) + !!(data["qBSCapacity"] & 0x80) * 2),
            scaleLevel: (!!(data["bSWCapacity"] & 0x2) + !!(data["bSWCapacity"] & 0x4)),
            walletLevel: (!!(data["bSWCapacity"] & 0x10) + !!(data["bSWCapacity"] & 0x20) * 2),
            magicLevel: data["maxMagic"]
        },
        songs: {
            zelda: !!(data["statusByte2"] & 0x10),
            epona: !!(data["statusByte2"] & 0x20),
            saria: !!(data["statusByte2"] & 0x40),
            sun: !!(data["statusByte2"] & 0x80),
            time: !!(data["statusByte1"] & 0x1),
            storm: !!(data["statusByte1"] & 0x2),
            minuet: !!(data["statusByte3"] & 0x40),
            bolero: !!(data["statusByte3"] & 0x80),
            serenade: !!(data["statusByte2"] & 0x1),
            nocturne: !!(data["statusByte2"] & 0x4),
            requiem: !!(data["statusByte2"] & 0x2),
            prelude: !!(data["statusByte2"] & 0x8)
        }
    };
}

function getItemStats(itemId, data) {
    switch (itemId) {
        case 0x00:
            const stickMax = () => {
                if      (data["dekuCapacity"] & 0x8) { return 30; }
                else if (data["dekuCapacity"] & 0x4) { return 20; }
                else                                 { return 10; }
            };
            return {itemName: "stick", count: {current: data["countStick"], max: stickMax()}};
        case 0x01:
            const nutMax = () => {
                if      (data["dekuCapacity"] & 0x20) { return 40; }
                else if (data["dekuCapacity"] & 0x10) { return 30; }
                else                                  { return 20; }
            };
            return {itemName: "nut", count: {current: data["countNut"], max: nutMax()}};
        case 0x02:
            const bombMax = () => {
                if (data["qBSCapacity"] & 0x10 && data["qBSCapacity"] & 0x8)
                { return 40; }
                else if (data["qBSCapacity"] & 0x10)
                { return 30; }
                else
                { return 20; }
            };
            return {itemName: "bomb", count: {current: data["countBomb"], max: bombMax()}};
        case 0x03:
            const quiverMax = () => {
                if (data["qBSCapacity"] & 0x2 && data["qBSCapacity"] & 0x1)
                { return 50; }
                else if (data["qBSCapacity"] & 0x2)
                { return 40; }
                else
                { return 30; }
            };
            return {itemName: "bow", count: {current: data["countArrow"], max: quiverMax()}};
        case 0x04:
            return {itemName: "fire-arrow"};
        case 0x05:
            return {itemName: "din"};
        case 0x06:
            const bulletMax = () => {
                if (data["bSWCapacity"] & 0x80 && data["BSWCapcity"] & 0x40)
                { return 50; }
                else if (data["bSWCapacity"] & 0x80)
                { return 40; }
                else
                { return 30; }
            };
            return {itemName: "slingshot", count: {current: data["countBullet"], max: bulletMax()}};
        case 0x07:
            return {itemName: "ocarina-fairy"};
        case 0x08:
            return {itemName: "ocarina-time"};
        case 0x09:
            return {itemName: "bombchu", count: { current: data["countBombchu"], max: 50 }};
        case 0x0A:
            return {itemName: "hookshot"};
        case 0x0B:
            return {itemName: "longshot"};
        case 0x0C:
            return {itemName: "ice-arrow"};
        case 0x0D:
            return {itemName: "farore"};
        case 0x0E:
            return {itemName: "boomerang"};
        case 0x0F:
            return {itemName: "lens"};
        case 0x10:
            return {itemName: "bean", count: {current: data["countBean"], max: 10}};
        case 0x11:
            return {itemName: "hammer"};
        case 0x12:
            return {itemName: "light-arrow"};
        case 0x13:
            return {itemName: "nayru"};
        case 0x14:
            return {itemName: "bottle-empty"};
        case 0x15:
            return {itemName: "bottle-red"};
        case 0x16:
            return {itemName: "bottle-green"};
        case 0x17:
            return {itemName: "bottle-blue"};
        case 0x18:
            return {itemName: "bottle-fairy"};
        case 0x19:
            return {itemName: "bottle-fish"};
        case 0x1A:
            return {itemName: "bottle-milk"};
        case 0x1B:
            return {itemName: "bottle-letter"};
        case 0x1C:
            return {itemName: "bottle-fire"};
        case 0x1D:
            return {itemName: "bottle-bugs"};
        case 0x1E:
            return {itemName: "bottle-big-poe"};
        case 0x1F:
            return {itemName: "bottle-milk-half"};
        case 0x20:
            return {itemName: "bottle-poe"};
        case 0x21:
            return {itemName: "weird-egg"};
        case 0x22:
            return {itemName: "cucco"};
        case 0x23:
            return {itemName: "letter"};
        case 0x24:
            return {itemName: "mask-keaton"};
        case 0x25:
            return {itemName: "mask-skull"};
        case 0x26:
            return {itemName: "mask-spooky"};
        case 0x27:
            return {itemName: "mask-bunny"};
        case 0x28:
            return {itemName: "mask-goron"};
        case 0x29:
            return {itemName: "mask-zora"};
        case 0x2A:
            return {itemName: "mask-gerudo"};
        case 0x2B:
            return {itemName: "mask-truth"};
        case 0x2C:
            return {itemName: "sold-out"};
        case 0x2D:
            return {itemName: "pocket-egg"};
        case 0x2E:
            return {itemName: "pocket-cucco"};
        case 0x2F:
            return {itemName: "cojiro"};
        case 0x30:
            return {itemName: "mushroom"};
        case 0x31:
            return {itemName: "medicine"};
        case 0x32:
            return {itemName: "saw"};
        case 0x33:
            return {itemName: "broken-sword"};
        case 0x34:
            return {itemName: "prescription"};
        case 0x35:
            return {itemName: "frog"};
        case 0x36:
            return {itemName: "eye-drops"};
        case 0x37:
            return {itemName: "claim"};
        default:
            return null
    }
}

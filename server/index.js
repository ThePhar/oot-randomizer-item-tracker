/* eslint-disable */
const express = require("express");
const app     = express();
const port    = process.env.PORT || 8080;

app.use(express.json());

app.post("/data", (req, res) => {
    printFancyConsole(req);

    res.send();
});

app.listen(port, () => console.log("Listening on port *:8080"));

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

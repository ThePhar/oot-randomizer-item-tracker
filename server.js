/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const status = require("./serverlib/status");

let data = {};

const gear = {
    // objectives: {
    //     skulltulaTokens: 0,
    //     triforcePieces: 0,
    //     emerald: true,
    //     ruby: true,
    //     sapphire: true,
    //     lightMedallion: true,
    //     forestMedallion: true,
    //     fireMedallion: true,
    //     waterMedallion: true,
    //     shadowMedallion: true,
    //     spiritMedallion: true,
    // },
    items: [
        {itemName: "stick", count: {current: 10, max: 10}},
        {itemName: "nut", count: {current: 0, max: 30}},
        {itemName: "bomb", count: {current: 28, max: 30}},
        {itemName: "bow", count: {current: 0, max: 30}},
        {itemName: "fire-arrow"},
        {itemName: "din"},
        {itemName: "slingshot", count: {current: 0, max: 30}},
        {itemName: "ocarina-time"},
        {itemName: "bombchu", count: {current: 20, max: 20}},
        {itemName: "longshot"},
        {itemName: "ice-arrow"},
        {itemName: "farore"},
        {itemName: "boomerang"},
        {itemName: "lens"},
        {itemName: "bean", count: {current: 10, max: 10}},
        {itemName: "hammer"},
        {itemName: "light-arrow"},
        {itemName: "nayru"},
        {itemName: "bottle-empty"},
        {itemName: "bottle-bugs"},
        {itemName: "bottle-fire"},
        {itemName: "bottle-letter"},
        {itemName: "cojiro"},
        {itemName: "mask-keaton"},
    ],
    equipment: {
        swords: {
            kokiriSword: true,
            masterSword: true,
            bigSword: true
        },
        shields: {
            dekuShield: true,
            hylianShield: true,
            mirrorShield: true,
        },
        tunics: {
            goronTunic: true,
            zoraTunic: true
        },
        boots: {
            ironBoots: true,
            hoverBoots: true
        }
    },
    keyItems: {
        // gerudoCard: true,
        // stoneOfAgony: true,
        liftLevel: 3,
        scaleLevel: 2,
        walletLevel: 3,
        magicLevel: 2
    },
    // songs: {
    //     zelda: true,
    //     epona: true,
    //     saria: true,
    //     sun: true,
    //     time: true,
    //     storm: true,
    //     minuet: true,
    //     bolero: true,
    //     serenade: true,
    //     nocturne: true,
    //     requiem: true,
    //     prelude: true
    // }
};
function generateInventory(data) {
    const items = [];

    for (let i = 0; i < 24; i++) {
        const item = data[`slot-${i}`];

        if (item === "empty" || item === undefined) {
            items.push(null);
            continue;
        }

        let count;
        const max = 30; // TODO: Get maxCounts.

        switch (item) {
            case "stick":
                count = data["count-sticks"];
                break;
            case "nut":
                count = data["count-nuts"];
                break;
            case "bomb":
                count = data["count-bombs"];
                break;
            case "bow":
                count = data["count-arrows"];
                break;
            case "slingshot":
                count = data["count-seeds"];
                break;
            case "bombchu":
                count = data["count-bombchus"];
                break;
            case "bean":
                count = data["count-beans"];
                break;
        }

        if (count) {
            items.push({ itemName: item, count: { current: count, max: max } });
        } else {
            items.push({ itemName: item });
        }
    }

    return items;
}
function generateKeys(data) {
    const statusFlags = {
        ...status.getByteFlags(data)
    };

    console.log(statusFlags);

    return statusFlags;
}

io.on("connection", (socket) => {
    socket.emit("FromAPI", {
        ...gear,
        items: generateInventory(data)
    });

    console.log("a user connected");
});

app.use(express.json());

app.use(express.static("./build"));
app.post("/data", (req, res) => {
    data = req.body;
    console.log(data);

    // io.emit("FromAPI", {
    //     ...gear,
    //     ...generateKeys(data),
    //     items: generateInventory(data),
    // });

    res.send();
});



http.listen(8080, () => {
    console.log("listening on 8080");
});

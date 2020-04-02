/* eslint-disable */
function printHexTable(startIndex, data) {
    let currentIndex = startIndex;

    console.log("      |0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F ");

    for (let i = 0; i < data.length - 2; i += 0x10) {
        let row = "";

        for (j = 0; j < 16; j++) {
            if (data[i + j] === undefined || data[i + j] === null) {
                row += "?? ";
                continue;
            }

            row += ("00" + data[i + j].toString(16)).slice(-2).toUpperCase() + " ";
        }

        console.log(currentIndex.toString(16).toUpperCase() + "|" + row);

        currentIndex += 0x10;
    }
}

module.exports = {
    printHexTable
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.halfenString = exports.xor = exports.hexToAscii = exports.asciiToHex = exports.hexToBinary = exports.binaryToHex = exports.rotateString = exports.decimalTo4BitBinary = exports.divideStringToChunks = void 0;
const divideStringToChunks = (str, len) => str.match(new RegExp(".{1," + len + "}", "g"));
exports.divideStringToChunks = divideStringToChunks;
const asciiToHex = (str) => {
    let arr1 = [];
    for (const c of str) {
        let hex = Number(c.charCodeAt(0)).toString(16);
        arr1.push(hex);
    }
    return arr1.join("").toUpperCase();
};
exports.asciiToHex = asciiToHex;
const decimalTo4BitBinary = (dec) => {
    const bin = "0000" + parseInt(dec, 10).toString(2);
    return bin.slice(bin.length - 4);
};
exports.decimalTo4BitBinary = decimalTo4BitBinary;
function hexToAscii(hex) {
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
exports.hexToAscii = hexToAscii;
const binaryToHex = (bin) => parseInt(bin, 2).toString(16);
exports.binaryToHex = binaryToHex;
const hexToBinary = (hexKey) => divideStringToChunks(hexKey, 2)
    .map((hex) => {
    const bin = "00000000" + parseInt(hex, 16).toString(2);
    return bin.slice(bin.length - 8);
})
    .join("");
exports.hexToBinary = hexToBinary;
const rotateString = (str, shift) => str.slice(shift, str.length) + str.slice(0, shift);
exports.rotateString = rotateString;
const xor = (str1, str2, len) => {
    let xor = Array(len);
    for (let i = 0; i < len; i++) {
        xor[i] = str1[i] === str2[i] ? 0 : 1;
    }
    return xor.join("");
};
exports.xor = xor;
const halfenString = (str) => {
    const halfLength = str.length / 2;
    return [str.substring(0, halfLength), str.substring(halfLength)];
};
exports.halfenString = halfenString;
//# sourceMappingURL=utils.js.map
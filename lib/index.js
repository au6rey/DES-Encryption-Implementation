"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const des_1 = __importDefault(require("./des"));
const utils_1 = require("./utils");
const hexKey = `57F19BCBFFA1BDO1`;
const des = new des_1.default({ hexKey });
const plainText = "EQUATION";
const hexMessage = (0, utils_1.asciiToHex)(plainText);
const encryptedMsg = des.encipher(hexMessage);
const decryptedMsg = des.decipher(encryptedMsg);
console.log("Plain message ASCII text: ", plainText);
console.log("Plain message hexadecimal: ", hexMessage);
console.log("Encryption key: ", hexKey);
console.log("Encrypted message hexadecimal: ", encryptedMsg);
console.log("Encrypted message ASCII text:: ", (0, utils_1.hexToAscii)(encryptedMsg));
console.log("Decrypted message hexadecimal: ", decryptedMsg);
console.log("Decrypted message text: ", (0, utils_1.hexToAscii)(decryptedMsg));
//# sourceMappingURL=index.js.map
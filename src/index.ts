import DES from "./des";
import { asciiToHex, hexToAscii } from "./utils";
const hexKey = `57F19BCBFFA1BDO1`;
const des = new DES({ hexKey });
const plainText = "EQUATION"
const hexMessage = asciiToHex(plainText);
const encryptedMsg = des.encipher(hexMessage);
const decryptedMsg = des.decipher(encryptedMsg);
console.log("Plain message ASCII text: " , plainText);
console.log("Plain message hexadecimal: " , hexMessage);
console.log("Encryption key: " , hexKey);
console.log("Encrypted message hexadecimal: " , encryptedMsg);
console.log("Encrypted message ASCII text:: " , hexToAscii(encryptedMsg));
console.log("Decrypted message hexadecimal: ", decryptedMsg);
console.log("Decrypted message text: ",hexToAscii(decryptedMsg));




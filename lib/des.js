"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const models_1 = require("./models");
const utils_1 = require("./utils");
class DES {
    mainKeyBinary;
    subKeys;
    constructor(params) {
        this.mainKeyBinary = (0, utils_1.hexToBinary)(params.hexKey);
        this.subKeys = this.generateSubkeys(this.mainKeyBinary);
    }
    generateSubkeys = (binaryKey) => {
        const permutation = constants_1.PC1.map((index) => binaryKey[index - 1]).join("");
        const halfPerm = (0, utils_1.halfenString)(permutation);
        let C0 = halfPerm[0];
        let D0 = halfPerm[1];
        let prevC0 = C0, prevD0 = D0;
        const circularShift = (roundIndex) => {
            C0 = (0, utils_1.rotateString)(prevC0, roundIndex);
            D0 = (0, utils_1.rotateString)(prevD0, roundIndex);
            prevC0 = C0;
            prevD0 = D0;
        };
        return constants_1.ROTATION_ROUNDS.map((round) => {
            circularShift(round);
            const tempKey = C0 + D0;
            return constants_1.PC2.map((index) => tempKey[index - 1]).join("");
        });
    };
    expandBlock = (block) => constants_1.E.map((index) => block[index - 1]).join("");
    getSBoxOutput = (bits) => {
        return (0, utils_1.divideStringToChunks)(bits, 6)
            .map((group, s) => {
            let row = parseInt(group[0] + group[5], 2);
            let col = parseInt(group.slice(1, 5), 2);
            return (0, utils_1.decimalTo4BitBinary)(constants_1.SBOX[s][16 * row + col]);
        })
            .join("");
    };
    getCipher = (options) => {
        const { message, cipherType } = options;
        const { LPT, RPT } = this.initialPermutation(message);
        const pair = this.feistalRounds(LPT, RPT, cipherType);
        return this.finalPermutation(pair);
    };
    finalPermutation = (pair) => {
        let cipherBinary = constants_1.FINAL_IP.map((index) => pair[index - 1]).join("");
        return (0, utils_1.divideStringToChunks)(cipherBinary, 4)
            .map(utils_1.binaryToHex)
            .join("")
            .toUpperCase();
    };
    initialPermutation = (message) => {
        let perm = constants_1.IP.map((index) => message[index - 1]).join("");
        const halfPerm = (0, utils_1.halfenString)(perm);
        return { LPT: halfPerm[0], RPT: halfPerm[1] };
    };
    encipher = (plainText) => this.getCipher({
        message: (0, utils_1.hexToBinary)(plainText),
        cipherType: models_1.CipherType.encipher,
    });
    decipher = (cipherText) => this.getCipher({
        message: (0, utils_1.hexToBinary)(cipherText),
        cipherType: models_1.CipherType.decipher,
    });
    feistalRounds = (LPT, RPT, cipherType) => {
        const subKeys = cipherType === models_1.CipherType.encipher
            ? this.subKeys
            : this.subKeys.reverse();
        let prevLPT = LPT, prevRPT = RPT;
        const feistalCipher = (subKey) => {
            //1. Expansion
            const expandedBlock = this.expandBlock(RPT);
            //2. Key mixing:
            const round = (0, utils_1.xor)(subKey, expandedBlock, 48);
            //3. Substitution
            const sBoxOut = this.getSBoxOutput(round);
            //4. Permutation:
            return constants_1.PBOX.map((index) => sBoxOut[index - 1]).join("");
        };
        for (let i = 0; i < 16; i++) {
            LPT = prevRPT;
            RPT = (0, utils_1.xor)(prevLPT, feistalCipher(subKeys[i]), 32);
            prevLPT = LPT;
            prevRPT = RPT;
        }
        return RPT + LPT;
    };
}
exports.default = DES;
//# sourceMappingURL=des.js.map
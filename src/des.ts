import {
  E,
  FINAL_IP,
  IP,
  PBOX,
  PC1,
  PC2,
  ROTATION_ROUNDS,
  SBOX,
} from "./constants";
import { CipherOptions, CipherType, DESInitParams } from "./models";
import {
  binaryToHex,
  decimalTo4BitBinary,
  divideStringToChunks,
  halfenString,
  hexToBinary,
  rotateString,
  xor,
} from "./utils";

export default class DES {
  private mainKeyBinary: string;
  private subKeys: string[];

  constructor(params: DESInitParams) {
    this.mainKeyBinary = hexToBinary(params.hexKey);
    this.subKeys = this.generateSubkeys(this.mainKeyBinary);
  }

  private generateSubkeys = (binaryKey: string): string[] => {
    const permutation = PC1.map((index) => binaryKey[index - 1]).join("");
    const halfPerm = halfenString(permutation);
    let C0 = halfPerm[0];
    let D0 = halfPerm[1];
    let prevC0 = C0,
      prevD0 = D0;

    const circularShift = (roundIndex: number) => {
      C0 = rotateString(prevC0, roundIndex);
      D0 = rotateString(prevD0, roundIndex);
      prevC0 = C0;
      prevD0 = D0;
    };

    return ROTATION_ROUNDS.map((round) => {
      circularShift(round);
      const tempKey = C0 + D0;
      return PC2.map((index) => tempKey[index - 1]).join("");
    });
  };

  private expandBlock = (block: string) =>
    E.map((index) => block[index - 1]).join("");

  private getSBoxOutput = (bits: string) => {
    return divideStringToChunks(bits, 6)!
      .map((group, s) => {
        let row = parseInt(group[0] + group[5], 2);
        let col = parseInt(group.slice(1, 5), 2);
        return decimalTo4BitBinary(SBOX[s][16 * row + col]);
      })
      .join("");
  };

  private getCipher = (options: CipherOptions) => {
    const { message, cipherType } = options;
    const { LPT, RPT } = this.initialPermutation(message);
    const pair = this.feistalRounds(LPT, RPT, cipherType);
    return this.finalPermutation(pair);
  };

  private finalPermutation = (pair: string) => {
    let cipherBinary = FINAL_IP.map((index) => pair[index - 1]).join("");
    return divideStringToChunks(cipherBinary, 4)!
      .map(binaryToHex)
      .join("")
      .toUpperCase();
  };

  private initialPermutation = (
    message: string
  ): { LPT: string; RPT: string } => {
    let perm = IP.map((index) => message[index - 1]).join("");
    const halfPerm = halfenString(perm);
    return { LPT: halfPerm[0], RPT: halfPerm[1] };
  };

  public encipher = (plainText: string) =>
    this.getCipher({
      message: hexToBinary(plainText),
      cipherType: CipherType.encipher,
    });

  public decipher = (cipherText: string) =>
    this.getCipher({
      message: hexToBinary(cipherText),
      cipherType: CipherType.decipher,
    });

  private feistalRounds = (
    LPT: string,
    RPT: string,
    cipherType: CipherType
  ) => {
    const subKeys =
      cipherType === CipherType.encipher
        ? this.subKeys
        : this.subKeys.reverse();
    let prevLPT = LPT,
      prevRPT = RPT;

    const feistalCipher = (subKey: string) => {
      //1. Expansion
      const expandedBlock = this.expandBlock(RPT);
      //2. Key mixing:
      const round = xor(subKey, expandedBlock, 48);
      //3. Substitution
      const sBoxOut = this.getSBoxOutput(round);
      //4. Permutation:
      return PBOX.map((index) => sBoxOut[index - 1]).join("");
    };

    for (let i = 0; i < 16; i++) {
      LPT = prevRPT;
      RPT = xor(prevLPT, feistalCipher(subKeys[i]), 32);
      prevLPT = LPT;
      prevRPT = RPT;
    }
    return RPT + LPT;
  };
}

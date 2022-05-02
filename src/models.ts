export type DESInitParams = {
  hexKey: string;
};
export enum CipherType {
  encipher,
  decipher,
}
export type CipherOptions = {
  message: string;
  cipherType: CipherType;
};


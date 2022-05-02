const divideStringToChunks = (str: string, len: number) =>
  str.match(new RegExp(".{1," + len + "}", "g"));

const asciiToHex = (str: string) => {
  let arr1 = [];
  for (const c of str) {
    let hex = Number(c.charCodeAt(0)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("").toUpperCase();
};
const decimalTo4BitBinary = (dec: any) => {
  const bin = "0000" + parseInt(dec, 10).toString(2);
  return bin.slice(bin.length - 4);
};
function hexToAscii(hex: string) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

const binaryToHex = (bin: string) => parseInt(bin, 2).toString(16);

const hexToBinary = (hexKey: string) =>
  divideStringToChunks(hexKey, 2)!
    .map((hex) => {
      const bin = "00000000" + parseInt(hex, 16).toString(2);
      return bin.slice(bin.length - 8);
    })
    .join("");

const rotateString = (str: string, shift: number) =>
  str.slice(shift, str.length) + str.slice(0, shift);

const xor = (str1: string, str2: string, len: number) => {
  let xor = Array(len);
  for (let i = 0; i < len; i++) {
    xor[i] = str1[i] === str2[i] ? 0 : 1;
  }
  return xor.join("");
};

const halfenString = (str: string): string[] => {
  const halfLength = str.length / 2;
  return [str.substring(0, halfLength), str.substring(halfLength)];
};

export {
  divideStringToChunks,
  decimalTo4BitBinary,
  rotateString,
  binaryToHex,
  hexToBinary,
  asciiToHex,
  hexToAscii,
  xor,
  halfenString
};

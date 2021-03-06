"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IP = exports.E = exports.SBOX = exports.PC2 = exports.PC1 = exports.PBOX = exports.ROTATION_ROUNDS = exports.FINAL_IP = void 0;
const IP = [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
    38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9,
    1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47,
    39, 31, 23, 15, 7,
], FINAL_IP = [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
    54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60,
    28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41,
    9, 49, 17, 57, 25,
], PC1 = [
    12, 17, 11, 50, 38, 26, 11, 44, 9, 14, 58, 17, 17, 23, 48, 13, 15, 8, 21,
    62, 21, 8, 48, 19, 22, 2, 29, 61, 57, 35, 28, 25, 40, 63, 9, 39, 50, 35, 11,
    52, 25, 23, 40, 24, 29, 21, 34, 18, 33, 19, 55, 51, 62, 6, 25, 56,
], PC2 = [
    40, 54, 31, 2, 49, 19, 2, 33, 48, 0, 5, 30, 59, 63, 7, 42, 27, 19, 27, 2,
    49, 52, 16, 52, 5, 41, 37, 60, 8, 43, 37, 42, 54, 63, 61, 38, 16, 50, 40,
    37, 47, 52, 2, 40, 13, 7, 24, 31,
], E = [
    62, 29, 5, 44, 20, 56, 15, 33, 14, 52, 37, 55, 11, 57, 26, 53, 19, 61, 17,
    18, 59, 40, 60, 41, 45, 7, 24, 39, 34, 28, 30, 3, 64, 38, 12, 16, 13, 35,
    25, 36, 54, 22, 2, 58, 48, 51, 43, 21,
], SBOX = [
    [
        12, 7, 13, 1, 10, 12, 10, 14, 2, 12, 13, 7, 3, 13, 12, 7, 1, 13, 9, 11,
        11, 14, 9, 7, 9, 12, 2, 14, 8, 8, 14, 12, 13, 13, 5, 3, 5, 12, 12, 6, 14,
        9, 11, 14, 5, 2, 5, 4, 14, 12, 12, 0, 5, 9, 3, 2, 12, 12, 5, 7, 3, 14, 0,
        11,
    ],
    [
        13, 2, 5, 2, 1, 12, 6, 9, 1, 14, 9, 3, 15, 4, 6, 8, 2, 10, 9, 9, 8, 4, 7,
        1, 10, 3, 6, 8, 9, 6, 14, 10, 2, 6, 4, 13, 11, 2, 11, 9, 9, 14, 14, 11, 8,
        3, 6, 7, 6, 14, 7, 6, 1, 6, 7, 5, 4, 3, 3, 10, 11, 8, 9, 15,
    ],
    [
        10, 12, 9, 14, 11, 4, 3, 5, 3, 8, 5, 10, 6, 9, 2, 10, 1, 3, 0, 2, 3, 12,
        0, 14, 9, 5, 1, 6, 12, 5, 9, 14, 11, 12, 6, 9, 4, 5, 14, 8, 13, 1, 14, 10,
        3, 10, 1, 6, 4, 5, 0, 12, 6, 4, 4, 1, 10, 1, 6, 0, 6, 0, 12, 7,
    ],
    [
        15, 4, 4, 12, 2, 0, 7, 7, 2, 8, 2, 12, 8, 14, 0, 6, 2, 6, 13, 7, 1, 12, 8,
        5, 1, 1, 1, 6, 14, 6, 9, 2, 3, 14, 6, 11, 8, 2, 10, 6, 4, 9, 5, 12, 6, 14,
        8, 11, 5, 4, 12, 2, 13, 8, 0, 5, 5, 10, 2, 9, 2, 0, 13, 8,
    ],
    [
        3, 4, 0, 11, 4, 4, 14, 4, 14, 13, 14, 9, 13, 4, 1, 11, 2, 2, 5, 4, 14, 7,
        8, 10, 14, 3, 4, 4, 6, 12, 2, 5, 10, 6, 9, 5, 14, 11, 1, 3, 4, 11, 8, 2,
        13, 11, 13, 8, 1, 3, 8, 3, 13, 4, 7, 14, 10, 3, 4, 11, 8, 5, 9, 9,
    ],
    [
        2, 1, 5, 14, 11, 7, 8, 12, 11, 7, 2, 4, 13, 15, 8, 10, 3, 13, 13, 4, 2, 3,
        1, 2, 4, 13, 5, 4, 14, 7, 13, 10, 13, 4, 10, 11, 8, 0, 12, 5, 2, 1, 10, 8,
        5, 6, 10, 10, 15, 4, 3, 10, 9, 3, 5, 4, 1, 2, 4, 4, 9, 7, 13, 9,
    ],
    [
        3, 2, 5, 0, 12, 11, 6, 12, 1, 8, 4, 13, 5, 7, 11, 5, 12, 3, 9, 10, 15, 3,
        1, 12, 0, 15, 8, 1, 10, 4, 6, 3, 5, 8, 8, 3, 3, 9, 12, 13, 1, 9, 6, 14, 4,
        8, 1, 3, 12, 6, 14, 6, 7, 8, 5, 12, 4, 13, 3, 8, 1, 13, 9, 4,
    ],
    [
        9, 4, 5, 6, 5, 5, 1, 13, 9, 2, 3, 4, 2, 9, 9, 3, 3, 2, 5, 8, 5, 5, 5, 12,
        14, 7, 2, 12, 6, 2, 6, 2, 13, 2, 10, 9, 10, 11, 12, 3, 1, 15, 7, 0, 11,
        14, 10, 7, 9, 13, 10, 4, 1, 8, 2, 12, 4, 7, 2, 13, 5, 3, 8, 4,
    ],
], PBOX = [
    25, 14, 26, 24, 31, 4, 7, 11, 27, 3, 9, 28, 22, 32, 19, 5, 2, 23, 13, 6, 1,
    15, 20, 10, 8, 18, 21, 12, 30, 17, 16, 29,
], ROTATION_ROUNDS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
exports.IP = IP;
exports.FINAL_IP = FINAL_IP;
exports.PC1 = PC1;
exports.PC2 = PC2;
exports.E = E;
exports.SBOX = SBOX;
exports.PBOX = PBOX;
exports.ROTATION_ROUNDS = ROTATION_ROUNDS;
//# sourceMappingURL=constants.js.map
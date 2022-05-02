"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.euclidGCD = exports.gcd = exports.offsetAsciiTo26Letters = exports.stringToAsciiArray = exports.extendedGCD = exports.extendedGCDRec = exports.findPrimeNumbersInRange = void 0;
const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0)
            return false;
    }
    return num > 1;
};
const findPrimeNumbersInRange = (start, end, target) => {
    let count = 1;
    let result = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            if (target.has(count)) {
                result.push(i);
            }
            count += 1;
        }
        if (result.length >= target.size) {
            break;
        }
    }
    return result;
};
exports.findPrimeNumbersInRange = findPrimeNumbersInRange;
const extendedGCDRec = (x, y) => {
    if (y.value == 0) {
        return x;
    }
    let q = x.value / y.value;
    let s = x.s - q * y.s;
    let t = x.t - q * y.t;
    const r = { value: x.value - q * y.value, s, t };
    return (0, exports.extendedGCDRec)(y, r);
};
exports.extendedGCDRec = extendedGCDRec;
const extendedGCD = (a, b) => {
    if (a == 0n && b == 0n) {
        return {
            value: -1,
            s: 0,
            t: 0,
        };
    }
    if (a == 0n) {
        return {
            value: Number(b),
            s: 0,
            t: 1,
        };
    }
    return (0, exports.extendedGCDRec)({ value: Number(a), s: 1, t: 0 }, { value: Number(b), s: 0, t: 1 });
};
exports.extendedGCD = extendedGCD;
const stringToAsciiArray = (str) => {
    const arr = [];
    for (const c of str.toUpperCase()) {
        arr.push(c.charCodeAt(0));
    }
    return arr;
};
exports.stringToAsciiArray = stringToAsciiArray;
const offsetAsciiTo26Letters = (asciiArr) => asciiArr.map((a) => a - 65);
exports.offsetAsciiTo26Letters = offsetAsciiTo26Letters;
const gcd = (...arr) => {
    const _gcd = (x, y) => (!y ? x : (0, exports.gcd)(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
};
exports.gcd = gcd;
function euclidGCD(a, b) {
    a = +a;
    b = +b;
    if (a !== a || b !== b) {
        return [NaN, NaN, NaN];
    }
    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return [Infinity, Infinity, Infinity];
    }
    // Checks if a or b are decimals
    if ((a % 1 !== 0) || (b % 1 !== 0)) {
        return null;
    }
    var signX = (a < 0) ? -1 : 1, signY = (b < 0) ? -1 : 1, x = 0, y = 1, u = 1, v = 0, q, r, m, n;
    a = Math.abs(a);
    b = Math.abs(b);
    while (a !== 0) {
        q = Math.floor(b / a);
        r = b % a;
        m = x - u * q;
        n = y - v * q;
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    return [b, signX * x, signY * y];
}
exports.euclidGCD = euclidGCD;
//# sourceMappingURL=prob2.js.map
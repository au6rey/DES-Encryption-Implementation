"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prob2_1 = require("./prob2");
class RSA {
    p;
    q;
    //   private phi: bigint;
    //   e: bigint;
    //   d: bigint;
    //   n: bigint;
    constructor(p, q) {
        this.p = p;
        this.q = q;
        // this.phi = this.getPhi();
        // this.n = this.p * this.q;
        // this.e = this.getEncryptionExponent(this.phi);
        // this.d = this.getDecryptionExponent(this.e, this.phi);
    }
    getPhi = () => (this.p - 1n) * (this.q - 1n);
    getN = () => this.p * this.q;
    getEncryptionExponent = (phi) => {
        let e = 46819;
        while ((0, prob2_1.gcd)(BigInt(e), phi) !== 1n) {
            e += 1;
        }
        return BigInt(e);
    };
    getDecryptionExponent = (e, phi) => {
        let d = BigInt((0, prob2_1.euclidGCD)(Number(e), Number(phi))[1]);
        while (d < 1) {
            d += phi;
        }
        return d;
    };
    encrypt(m, publicKey) {
        const { e, n } = publicKey;
        if (m < 0 || m >= n) {
            throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
        }
        if ((0, prob2_1.gcd)(m, n) !== 1n) {
            throw new Error("Condition gcd(m, n) = 1 not met.");
        }
        return m ** e % n;
    }
    decrypt = (c, secretKey) => {
        const { d, p, q } = secretKey;
        return c ** d % (p * q);
    };
}
exports.default = RSA;
//# sourceMappingURL=rsa.js.map
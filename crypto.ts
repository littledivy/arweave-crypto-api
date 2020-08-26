import { pemTojwk, jwkTopem } from "./pem";

import * as crypto from "crypto";
import * as constants from "constants";

export interface JWKPublicInterface {
  kty: string;
  e: string;
  n: string;
}

export interface JWKInterface extends JWKPublicInterface {
  d?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
}

const keyLength = 4096;
const publicExponent = 0x10001;
const hashAlgorithm = "sha256";
const encryptionAlgorithm = "aes-256-cbc";

export function generateJWK(): Promise<JWKInterface> {
  if (typeof crypto.generateKeyPair != "function") {
    throw new Error(
      "Keypair generation not supported in this version of Node, only supported in versions 10+"
    );
  }

  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      "rsa",
      <crypto.RSAKeyPairOptions<"pem", "pem">>{
        modulusLength: keyLength,
        publicExponent: publicExponent,
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
      },
      (err: any, publicKey: string, privateKey: string) => {
        if (err) {
          reject(err);
        }
        resolve(this.pemToJWK(privateKey));
      }
    );
  });
}

export function sign(jwk: object, data: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    resolve(
      crypto
        .createSign(hashAlgorithm)
        .update(data)
        .sign({
          key: this.jwkToPem(jwk),
          padding: constants.RSA_PKCS1_PSS_PADDING,
          saltLength: 0,
        })
    );
  });
}

export function verify(
  publicModulus: string,
  data: Uint8Array,
  signature: Uint8Array
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const publicKey = {
      kty: "RSA",
      e: "AQAB",
      n: publicModulus,
    };

    const pem = jwkToPem(publicKey);

    resolve(
      crypto.createVerify(hashAlgorithm).update(data).verify(
        {
          key: pem,
          padding: constants.RSA_PKCS1_PSS_PADDING,
          saltLength: 0,
        },
        signature
      )
    );
  });
}

export function hash(
  data: Uint8Array,
  algorithm: string = "SHA-256"
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    resolve(
      crypto
        .createHash(parseHashAlgorithm(algorithm))
        .update(data)
        .digest()
    );
  });
}

/**
 * If a key is passed as a buffer it *must* be exactly 32 bytes.
 * If a key is passed as a string then any length may be used.
 *
 * @param {Buffer} data
 * @param {(string | Buffer)} key
 * @returns {Promise<Uint8Array>}
 */
export async function encrypt(
  data: Buffer,
  key: string | Buffer
): Promise<Uint8Array> {
  // As we're using CBC with a randomised IV per cypher we don't really need
  // an additional random salt per passphrase.
  const derivedKey = crypto.pbkdf2Sync(
    key,
    "salt",
    100000,
    32,
    hashAlgorithm
  );

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    encryptionAlgorithm,
    derivedKey,
    iv
  );

  const encrypted = Buffer.concat([iv, cipher.update(data), cipher.final()]);

  return encrypted;
}

/**
 * If a key is passed as a buffer it *must* be exactly 32 bytes.
 * If a key is passed as a string then any length may be used.
 *
 * @param {Buffer} encrypted
 * @param {(string | Buffer)} key
 * @returns {Promise<Uint8Array>}
 */
export async function decrypt(
  encrypted: Buffer,
  key: string | Buffer
): Promise<Uint8Array> {
  try {
    // As we're using CBC with a randomised IV per cypher we don't really need
    // an additional random salt per passphrase.
    const derivedKey = crypto.pbkdf2Sync(
      key,
      "salt",
      100000,
      32,
      this.hashAlgorithm
    );

    const iv = encrypted.slice(0, 16);

    const data = encrypted.slice(16);

    const decipher = crypto.createDecipheriv(
      encryptionAlgorithm,
      derivedKey,
      iv
    );

    const decrypted = Buffer.concat([
      decipher.update(data),
      decipher.final(),
    ]);

    return decrypted;
  } catch (error) {
    throw new Error("Failed to decrypt");
  }
}

export function jwkToPem(jwk: object): string {
  return jwkTopem(jwk);
}

export function pemToJWK(pem: string): JWKInterface {
  let jwk = pemTojwk(pem);
  return jwk;
}

export function parseHashAlgorithm(algorithm: string): string {
  switch (algorithm) {
    case "SHA-256":
      return "sha256";
    case "SHA-384":
      return "sha384";
    default:
      throw new Error(`Algorithm not supported: ${algorithm}`);
  }
}

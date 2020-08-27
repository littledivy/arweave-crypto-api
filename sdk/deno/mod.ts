async function request(endpoint: string) {
  return await fetch(`https://arweave-crypto-api.vercel.app/api${endpoint}`);
}

async function postRequest(endpoint: string, body: any) {
  return await fetch(
    // `https://arweave-crypto-api.vercel.app/api${endpoint}`,
    `http://localhost:3001/api${endpoint}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function generateJWK() {
  return (await request("/generateJWK")).json();
}

export async function hash(data: Uint8Array, algorithm?: string) {
  return (await postRequest("/hash", {
      data,
      algorithm: algorithm || "SHA-256"
  })).text();
}

export async function verify(publicModulus: string, data: Uint8Array, signature: Uint8Array) {
  return (await postRequest("/verify", {
      publicModulus,
      data,
      signature,
  })).text();
}

export async function sign(jwk: object, data: Uint8Array) {
  return (await postRequest("/sign", {
    jwk,
    data,
  }).text();
}

export async function encrypt(data: Uint8Array, key: string) {
  return (await postRequest("/encrypt", {
    data,
    key,
  }).text();
}

export async function decrypt(encrypted: Uint8Array, key: string) {
  return (await postRequest("/decrypt", {
    encrypted,
    key,
  }).text();
}

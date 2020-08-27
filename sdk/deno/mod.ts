async function request(endpoint: string) {
  return await fetch(`https://arweave-crypto-api.vercel.app/api${endpoint}`);
}

async function postRequest(endpoint: string, body: any) {
  return await fetch(
    `https://arweave-crypto-api.vercel.app/api${endpoint}`,
    // `http://localhost:3000/api${endpoint}`,
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
  let r = (await postRequest("/hash", {
    data,
    algorithm: algorithm || "SHA-256",
  })).json();
  let result = await r;
  return result.result;
}

export async function verify(
  publicModulus: string,
  data: Uint8Array,
  signature: Uint8Array,
) {
  let r = (await postRequest("/verify", {
    publicModulus,
    data,
    signature,
  })).json();
  let result = await r;
  return result.result;
}

export async function sign(jwk: object, data: Uint8Array) {
  let r = (await postRequest("/sign", {
    jwk,
    data,
  })).json();
  let result = await r;
  return result.result;
}

export async function encrypt(data: Uint8Array, key: string) {
  let r = (await postRequest("/encrypt", {
    data,
    key,
  })).json();
  let result = await r;
  return result.result;
}

export async function decrypt(encrypted: Uint8Array, key: string) {
  let r = (await postRequest("/decrypt", {
    encrypted,
    key,
  })).json();
  let result = await r;
  return result.result;
}

async function request(endpoint: string) {
  return await fetch(`https://arweave-crypto-api.vercel.app/api${endpoint}`);
}

async function postRequest(endpoint: string, body: any) {
  return await fetch(
    `https://arweave-crypto-api.vercel.app/api${endpoint}`,
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
      algorithm: algorithm || null
  })).text();
}

export async function verify() {
  return (await request("/generateJWK")).json();
}

console.log(await hash(new Uint8Array(0)));

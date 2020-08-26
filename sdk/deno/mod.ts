async function request(endpoint: string) {
  return await fetch(`${endpoint}`);
}

export async function generateJWK() {
    return (await request('/generateJWK')).json()
}

console.log(await generateJWK())
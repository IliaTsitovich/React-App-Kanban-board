// NOTE: this is client-side-only "hashing" for a local demo app with no backend.
// It stops a casual look at localStorage from showing a plaintext password, but it is
// NOT real authentication security: the code, salt, and hash all live in the same
// browser the "attacker" controls, so it offers no protection against someone editing
// their own localStorage. Do not reuse this pattern for anything that talks to a server.

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function randomSaltHex(byteLength = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return bufferToHex(bytes);
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(digest);
}

export async function hashPassword(password) {
  const salt = randomSaltHex();
  const hash = await sha256Hex(`${salt}:${password}`);
  return { salt, hash };
}

export async function verifyPassword(password, salt, expectedHash) {
  const hash = await sha256Hex(`${salt}:${password}`);
  return hash === expectedHash;
}

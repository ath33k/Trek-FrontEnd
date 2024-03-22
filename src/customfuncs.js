export async function generateEncryptionKey() {
  // Generate a random encryption key
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256, // Key length (in bits)
    },
    true, // Whether the key is extractable
    ["encrypt", "decrypt"] // Key usages
  );

  // Export the key as a Base64-encoded string
  const exportedKey = await window.crypto.subtle.exportKey(
    "raw", // Export format
    key // CryptoKey object
  );

  // Convert the exported key to a Base64-encoded string
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));

  return base64Key;
}

const genKey = "73DCFJmVnBG7GZEgNfr195uKjKperuDpwi8ibHTilZQ=";

export async function encryptData(data, key = genKey) {
  // Convert the text to an ArrayBuffer
  const dataBuffer = new TextEncoder().encode(data);

  // Generate an encryption key
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Generate an initialization vector
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    cryptoKey,
    dataBuffer
  );

  // Concatenate the IV and the encrypted data
  const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
  encryptedArray.set(iv);
  encryptedArray.set(new Uint8Array(encryptedData), iv.length);

  // Convert the encrypted data to a base64-encoded string
  return btoa(String.fromCharCode(...encryptedArray));
}

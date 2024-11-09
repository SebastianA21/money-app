// Decryption.ts
import forge from 'node-forge';

// Function to decrypt data
export function decryptData(encryptedDataBase64: string) {
    try {
        // Decode base64-encoded encrypted data to binary
        const encryptedData = forge.util.decode64(encryptedDataBase64);

        // Retrieve the private key from localStorage
        const privateKeyPem = localStorage.getItem('privateKey');
        if (!privateKeyPem) {
            throw new Error('Private key not found in localStorage');
        }

        // Convert the PEM format private key to a usable key
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

        // Decrypt the data using the private key with proper padding
        const decryptedData = privateKey.decrypt(encryptedData, 'RSA-OAEP');

        // Convert decrypted binary data to UTF-8 string
        const decodedData = forge.util.decodeUtf8(decryptedData);

        console.log('Private key used for decryption:', privateKeyPem);

        return decodedData;
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
}
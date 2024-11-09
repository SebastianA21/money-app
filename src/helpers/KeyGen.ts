// KeyGen.ts
import forge from 'node-forge';

export function generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    return new Promise((resolve, reject) => {
        forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1 }, (err, keypair) => {
            if (err) {
                return reject(err);
            }

            const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
            const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

            // Store the keys in localStorage instead of the filesystem
            localStorage.setItem('publicKey', publicKeyPem);
            localStorage.setItem('privateKey', privateKeyPem);

            console.log('RSA key pair generated and saved in localStorage');
            resolve({ publicKey: publicKeyPem, privateKey: privateKeyPem });
        });
    });
}

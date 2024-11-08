import { generateKeyPairSync } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export const generateRSAKeyPair = (): void => {

    const keyDirs: string = join(__dirname, "..","keys");
    
    const privateKeyPath: string = join(keyDirs, "private.key");
    const publicKeyPath: string = join(keyDirs, "public.key");

    if (!existsSync(privateKeyPath) || !existsSync(publicKeyPath)) {
        mkdirSync(keyDirs, { recursive: true });

        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: "aes-256-cbc",
                passphrase: process.env.SECRET_KEY
            }
        });
    
        writeFileSync(privateKeyPath, privateKey);
        writeFileSync(publicKeyPath, publicKey);
    }
};

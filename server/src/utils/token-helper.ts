import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { join } from "path";
import crypto, { createPrivateKey } from "crypto";


const decryptPrivateKey = (encryptedPrivateKeyPath: string, passphrase: string) => {
    const encryptedKey = readFileSync(encryptedPrivateKeyPath, "utf-8"); 
  
    const keyObject: crypto.KeyObject = createPrivateKey({
        key: encryptedKey,
        format: "pem",
        passphrase: passphrase
    });

    return keyObject.export({ format: "pem", type: "pkcs8" }).toString();
};


export const generateToken = (userPayload: jwt.JwtPayload) => {

    const privateKeyPath: string = join(__dirname, "..", "keys", "private.key");
    const privateKey: string = decryptPrivateKey(privateKeyPath, process.env.PASSPHRASE!);

    return jwt.sign({ userPayload }, privateKey, {
        algorithm: "RS256",
        expiresIn: "2d"
    });
};


export const verifyToken = (token: string) => {
    try {
        const publicKeyPath: string = join(__dirname, "..", "keys", "public.key");
        const publicKey : string = readFileSync(publicKeyPath, "utf-8"); 
    
        const decoded: jwt.JwtPayload = jwt.verify(token, publicKey, {
            algorithms: ["RS256"]
        }) as jwt.JwtPayload;
    
        return decoded;
    } 
    catch (error: any) {
        console.log("Token verification failed", error.message);
        return null;   
    }
};
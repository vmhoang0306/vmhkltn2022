import crypto from "crypto";

const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const EncryptHelper = {
  enCode: (str: any) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(str);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
  },

  deCode: (str: any) => {
    let iv = Buffer.from(str.iv, "hex");
    let encryptedText = Buffer.from(str.encryptedData, "hex");
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  },
};

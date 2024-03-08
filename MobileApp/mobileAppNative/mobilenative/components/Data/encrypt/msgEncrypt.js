import CryptoJS from 'crypto-js';


function encrypt(message) {
    try {
        const key = CryptoJS.enc.Base64.parse("2hlCshmQaK/NKVnydrQ6b3b3FxMbT23N/i+Xm5K/Gms=");
        const iv = CryptoJS.enc.Hex.parse("77fNeA16sN6uDeRA");
        const options = { mode: CryptoJS.mode.CBC, iv: iv };
        const ciphertext = CryptoJS.AES.encrypt(message, key, options);
        console.log("--------"+ciphertext.toString());
        return ciphertext.toString();
        } catch (err) {
        console.error('Error encrypting message:', err);
        return undefined;
    }
}

const decrypt = (encryptedData) => {
    try {
        //const key = CryptoJS.enc.Base64.parse("2hlCshmQaK/NKVnydrQ6b3b3FxMbT23N/i+Xm5K/Gms=");
        //const iv = CryptoJS.enc.Base64.parse("77fNeA16sN6uDeRA");
        const key = "2hlCshmQaK/NKVnydrQ6b3b3FxMbT23N/i+Xm5K/Gms=";
        const iv = "77fNeA16sN6uDeRA";
        const options = { mode: CryptoJS.mode.CBC, iv: iv };
        // Decrypt the ciphertext
        const bytes = CryptoJS.AES.decrypt(encryptedData, key, options);
        const decryptedData = bytes.toString(CryptoJS.enc.Base64);
        console.log("!!!!"+decryptedData)
        return decryptedData;
        // const key = CryptoJS.enc.Base64.parse("2hlCshmQaK/NKVnydrQ6b3b3FxMbT23N/i+Xm5K/Gms=");
        // const iv = CryptoJS.enc.Hex.parse("77fNeA16sN6uDeRA");
        // const decrypted = CryptoJS.AES.decrypt({
        //     ciphertext: CryptoJS.enc.Base64.parse(encryptedData)
        // }, key, {
        //     iv: iv,
        //     mode: CryptoJS.mode.CBC,
        //     padding: CryptoJS.pad.Pkcs7
        // });
        // return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}



export default {encrypt,decrypt};
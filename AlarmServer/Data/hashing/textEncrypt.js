const crypto = require('crypto');
require('dotenv').config();

/*
    plaintext: The text that you want to encrypt.
    key: A 256-bit encryption key."7625e224dc0f0ec91ad28c1ee67b1eb96d1a5459533c5c950f44aae1e32f2da3"
    ciphertext: The encrypted text."53022cf12c5959ddf3e733128930dd3d52e3ea"
    iv: A 96-bit initialization vector to provide the initial state for the 
        encryption and allow the same key to be re-used with a different iv 
        for future encryption operations."aabbccddeeff00112233445566778899"
    tag: A piece of data generated during the encryption process to help verify 
        that the encrypted text was not tampered with later during the decryption process.
        (hex format): aabbccddeeff00112233445566778899
    function call:
        const plaintext = "encrypt me";
        const key = crypto.randomBytes(32).toString('base64');
        const { ciphertext, iv, tag } = encryptSymmetric(key, plaintext);

        key = "7625e224dc0f0ec91ad28c1ee67b1eb96d1a5459533c5c950f44aae1e32f2da3"
    ciphertext = "53022cf12c5959ddf3e733128930dd3d52e3ea"
    iv = "aabbccddeeff00112233445566778899"
    tag = ""  # If using authenticated encryption, provide the tag here
    crypto.createCipheriv(algorithm, key, iv, options);
*/
const encrypt = (plaintext) => {
    try{
        const key = process.env.ENCRYPT_KEY;
        const iv = process.env.ENCRYPT_IV;
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key,'base64'), iv,'base64');
        // Encrypt the plaintext
        let encryptedData = cipher.update(plaintext, 'utf8', 'base64');
        encryptedData += cipher.final('base64');
        return encryptedData;
    }catch(error) {
        console.log(error);
        return undefined;
    }
  }
  
  /*
    key: The 256-bit encryption key used to encrypt the original text.
    ciphertext: The encrypted text that you want to decrypt.
    iv: The 96-bit initialization vector used during the encryption.
    tag: The tag generated during the encryption.
    plaintext: The original text that we encrypted.
    function call:
    const plaintext = decryptSymmetric(key, ciphertext, iv, tag);
  */
const decrypt = (encryptedData) => {
    try{
        const key = process.env.ENCRYPT_KEY;
        const iv = process.env.ENCRYPT_IV;
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key,'base64'), iv,'base64');
        // Decrypt the ciphertext
        let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }catch(error) {
        console.log(error);
        return undefined;
    }
  }
  
module.exports= {encrypt,decrypt};

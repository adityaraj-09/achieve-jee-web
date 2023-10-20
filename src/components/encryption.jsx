import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

const secretKey = process.env.REACT_APP_ENCRYPTION_KEY; 


export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return Base64.encode(encryptedData);
};


 export const decryptData = (encryptedData) => {
  const decodedEncryptedText = Base64.decode(encryptedData);
  const bytes = CryptoJS.AES.decrypt(decodedEncryptedText, secretKey);
  if (!bytes) {
    return null;
  }
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const encryptString = (text) => {
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return Base64.encode(encryptedText);
};

// Function to decrypt a string
export const decryptString = (encryptedText) => {
  const decodedEncryptedText = Base64.decode(encryptedText);
  const bytes = CryptoJS.AES.decrypt(decodedEncryptedText, secretKey);
  if (!bytes) {
    return null;
  }
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};


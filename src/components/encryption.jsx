import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_ENCRYPTION_KEY; 


export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};


 export const decryptData = (encryptedData) => {
  if(!encryptedData){
    return null
  }
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  if (!bytes) {
    return null;
  }
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const encryptString = (text) => {
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encryptedText;
};

// Function to decrypt a string
export const decryptString = (encryptedText) => {
  if(!encryptedText){
    return null
  }
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  if (!bytes) {
    return null;
  }
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};


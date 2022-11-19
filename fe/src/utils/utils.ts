const CryptoJS = require("crypto-js");

export const Utils = {
  enCode: (str: any) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
  },

  deCode: (str: any) => {
    return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
  },
};

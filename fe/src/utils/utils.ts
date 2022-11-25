const CryptoJS = require("crypto-js");

export const Utils = {
  enCode: (str: any) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
  },

  deCode: (str: any) => {
    return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
  },

  string: {
    isNullOrEmpty: (str: any) => {
      try {
        if (str.length === 0 || str === null || str === undefined) {
          return true;
        }
      } catch (_e: any) {
        return true;
      }
      return false;
    },
  },
  
  number: {
    isNullOrEmpty: (number: number) => {
      try {
        if (number === 0 || number === null || number === undefined) {
          return true;
        }
      } catch (_e: any) {
        return true;
      }
      return false;
    },
  },

  date: {
    getTime: (str: string) => {
      const date = new Date(str);
      return date.getHours() + ':' + date.getMinutes();
    },

    getDate: (str: any) => {
      const date = new Date(str);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    },

    formatDateInput: (str: any) => {
      const date = new Date(str);
      const DATE = `0${date.getDate()}`.slice(-2);
      const MONTH = `0${date.getMonth() + 1}`.slice(-2);
      const YEAR = `${date.getFullYear()}`;
      const strdate = YEAR + '-' + MONTH + '-' + DATE;
      if (strdate === 'NaN-aN-aN') {
        return undefined;
      } else {
        return strdate;
      }
    },

    getTheOlddate: (str: any, number: number) => {
      const date = new Date(str);
      const milis_date = date.getTime();
      const milis_number = number * 24 * 3600 * 1000;
      const new_milis = milis_date - milis_number;
      return new Date(new_milis);
    },
    
    getYear: (year: any) => {
      if (year === 0 || year === null || year === undefined || isNaN(year)) {
        return -1;
      }
      let yearReturn = new Date(year);
      return yearReturn.getFullYear();
    },
    
    getMonth: (month: any) => {
      if (month === 0 || month === null || month === undefined || isNaN(month)) {
        return -1;
      }
      let monthReturn = new Date(month);
      return monthReturn.getMonth() + 1;
    },

    getHour: (moment: any) => {
      const time = new Date(moment);
      return time.getHours();
    },

    getMinute: (moment: any) => {
      const time = new Date(moment);
      return time.getMinutes();
    },

    comparison: (date1: any, date2: any) => {
      const d1 = Utils.date.formatDateInput(date1);
      const d2 = Utils.date.formatDateInput(date2);

      if (d1! >= d2!) {
        return true;
      } else {
        return false;
      }
    },

    firstdate: (date: any) => {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), 1);
    },

    lastdate: (date: any) => {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    },
  },
};

export const Utils = {
  string: {
    isNullOrEmpty: (str) => {
      try {
        if (str.length === 0 || str === null || str === undefined) {
          return true;
        }
      } catch (_e) {
        return true;
      }
      return false;
    },
  },
  
  number: {
    isNullOrEmpty: (number) => {
      try {
        if (number === 0 || number === null || number === undefined) {
          return true;
        }
      } catch (_e) {
        return true;
      }
      return false;
    },
  },

  date: {
    getDay: (str) => {
      const date = new Date(str);
      return date.getDay();
    },

    getTime: (str) => {
      const date = new Date(str);
      const HOUR = `0${date.getHours()}`.slice(-2);
      const MINUTE = `0${date.getMinutes()}`.slice(-2);

      return HOUR + ':' + MINUTE;
    },

    formatDate: (str) => {
      const date = new Date(str);
      const DATE = `0${date.getDate()}`.slice(-2);
      const MONTH = `0${date.getMonth() + 1}`.slice(-2);
      const YEAR = `${date.getFullYear()}`;
      const strdate = DATE + '-' + MONTH + '-' + YEAR;
      if (strdate === 'NaN-aN-aN') {
        return undefined;
      } else {
        return strdate;
      }
    },

    formatDateInput: (str) => {
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

    getTheOlddate: (str, number) => {
      const date = new Date(str);
      const milis_date = date.getTime();
      const milis_number = number * 24 * 3600 * 1000;
      const new_milis = milis_date - milis_number;
      return new Date(new_milis);
    },
    
    getYear: (year) => {
      if (year === 0 || year === null || year === undefined || isNaN(year)) {
        return -1;
      }
      let yearReturn = new Date(year);
      return yearReturn.getFullYear();
    },
    
    getMonth: (month) => {
      if (month === 0 || month === null || month === undefined || isNaN(month)) {
        return -1;
      }
      let monthReturn = new Date(month);
      return monthReturn.getMonth() + 1;
    },

    getHour: (moment) => {
      const time = new Date(moment);
      return time.getHours();
    },

    getMinute: (moment) => {
      const time = new Date(moment);
      return time.getMinutes();
    },

    comparison: (date1, date2) => {
      const d1 = Utils.date.formatDateInput(date1);
      const d2 = Utils.date.formatDateInput(date2);

      if (d1 >= d2) {
        return true;
      } else {
        return false;
      }
    },

    firstdate: (date) => {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), 1);
    },

    lastdate: (date) => {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    },

    nextdate: (date) => {
      const d = new Date(date);
      const milis_date = d.getTime();
      const milis_number =  24 * 3600 * 1000;
      const new_milis = milis_date + milis_number;
      return new Date(new_milis);
    }
  },
};

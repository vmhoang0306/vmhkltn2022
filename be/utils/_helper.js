export const mongooseHelper = {
  ToList: (input) => {
    return input.map((i) => i.toObject());
  },

  ToObject: (input) => {
    return input ? input.toObject() : input;
  },
};

export const dataHelper = {
  getIsActive: (list) => {
    const newlist = [];
    list.map((item) => {
      if (item.isactive === true) {
        newlist.push(item);
      }
    });
    return newlist;
  },

  getIsNotDelete: (list) => {
    const newlist = [];
    list.map((item) => {
      if (item.isdelete === false) {
        newlist.push(item);
      }
    });
    return newlist;
  },

  getIsNotDeleteAndIsActive: (list) => {
    const newlist = [];
    list.map((item) => {
      if (item.isactive === true && item.isdelete === false) {
        newlist.push(item);
      }
    });
    return newlist;
  },
};

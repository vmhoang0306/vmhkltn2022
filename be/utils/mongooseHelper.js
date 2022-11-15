export const mongooseHelper = {
  JsonToList: (json) => {
    return json.map((j) => j.toObject());
  },

  JsonToObject: (json) => {
    return json ? json.toObject() : json;
  },
};

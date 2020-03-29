export const insertInToText = (str, ...inserts) => inserts.reduce((acc, val) => acc.replace(/%s/, val), str)

export const arrayToObjByKey = (arr, property) => arr.reduce((acc, item) => {
  acc[item[property]] = item;
  return acc;
}, {})

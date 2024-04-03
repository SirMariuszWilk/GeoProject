export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export const sanitizeGeoJSON = (jsonObject) =>
  Object.fromEntries(Object.entries(jsonObject).filter(([_, v]) => v != null));

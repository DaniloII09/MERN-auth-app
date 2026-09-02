const sanitize = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

  for (const key of Object.keys(obj)) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else {
      sanitize(obj[key]);
    }
  }
  return obj;
};

export const sanitizeMongo = (req, res, next) => {
  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);
  next();
};
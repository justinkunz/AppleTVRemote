const fs = require("fs");
const path = require("path");

const getCredentials = () => {
  const filePath = path.join(__dirname, "../", ".appletv-creds");
  const exists = fs.existsSync(filePath);
  return exists ? fs.readFileSync(filePath, "utf-8") : false;
};

module.exports = { getCredentials };

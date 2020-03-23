const appletv = require("../appletv");
const { getCredentials } = require("../helpers");

module.exports = app => {
  app.get("/press/:key", async (req, res) => {
    const credentials = getCredentials();
    if (!credentials) {
      res.json({ status: "error", message: "Missing Credentials File" });
      return;
    }

    const { key } = req.params;
    const status = await appletv.control(credentials, key);
    res.json({ status, key });
  });
};

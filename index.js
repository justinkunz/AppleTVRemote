const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const PORT = 3000;

// Set express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public", "assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Express Routes + Listener
routes(app);
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

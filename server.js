const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const database = process.env.DB;

mongoose
  .connect(database)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

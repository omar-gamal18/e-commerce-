const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const database = process.env.DB;

mongoose.connect(database).then(() => {
  console.log("DB connected");
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});

const fs = require("fs");
const path = require("path");
const dns = require("dns");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../../models/productModel");

dns.setServers(["8.8.8.8"]);

dotenv.config({ path: path.join(__dirname, "../../.env") });

// connect to DB

const app = require("../../app");

const database = process.env.DB;

mongoose.connect(database).then(() => {
  console.log("DB connected");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// Read data
const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
);

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log("Data Inserted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MongoDbURL);
    console.log("MongoDB Connected done");
  } catch (err) {
    console.error("MongoDB Connection Failed ", err);
    process.exit(1);
  }
};

module.exports = connectDb;

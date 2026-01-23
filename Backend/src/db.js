import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MongoDBURI);
    console.log("MongoDB connected ");
  } catch (err) {
    console.log("MongoDB connecting error :", err.message);

  }
}

export default connectDb;

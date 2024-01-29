import mongoose from "mongoose";

const dbURL = "mongodb://db:27017/mon-mongo-container";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURL);
  } catch (error) {
    console.error("Error while connecting to db :". error);
  }
}

export { connectToDB };
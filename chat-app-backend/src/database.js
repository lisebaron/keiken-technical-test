import mongoose, { mongo } from "mongoose";

const dbURL = "mongodb://localhost:27017/mon-mongo-container";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("db connected");
  } catch (error) {
    console.error("Error while connecting to db :". error);
  }
}

const closeConnectiontoDB = mongoose.connection.close;

export { connectToDB, closeConnectiontoDB };
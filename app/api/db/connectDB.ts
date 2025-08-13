import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("yess connected:", conn.connection.host);
  } catch (error) {
    console.log((error as Error).message);
  }
};

export default connectDB;

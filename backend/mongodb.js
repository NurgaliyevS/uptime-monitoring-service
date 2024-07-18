import mongoose from "mongoose";
import { isDevelopment } from "@/utils/isDevelopment";

const uri = isDevelopment()
  ? process.env.MONGODB_URI_DEV
  : process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local or .env.production"
  );
}

let isConnected;

const connectMongoDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...(isDevelopment() && {
        authSource: "admin",
      }),
    });
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

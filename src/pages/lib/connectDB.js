import mongoose from "mongoose";

// const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_URL =
  "mongodb+srv://dheeraj:5VCvNUiJIkjoVIUa@cluster0.0te3dg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/pc_build";

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log("connected to db");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

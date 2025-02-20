import mongoose from "mongoose";

let cached = global.mongooseConn;

// checking connection
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DATABASE_URL)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn= await cached.promise;
  return cached.conn;
}

export default connectDB;

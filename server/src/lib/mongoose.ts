import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("✅ MongoDB disconnected");
  } catch (err) {
    console.error("❌ MongoDB disconnection error:", err);
    throw err;
  }
};
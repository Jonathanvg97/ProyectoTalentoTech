import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbURL = process.env.MONGODB_URI;
    await mongoose.connect(dbURL as string);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
  }
};

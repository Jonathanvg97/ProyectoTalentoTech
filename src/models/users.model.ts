import mongoose, { Schema, Document, Model } from "mongoose";

// Define una interfaz para el modelo de usuario
interface InterfaceUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Define el esquema del usuario
const UserSchema: Schema<InterfaceUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Crea y exporta el modelo basado en el esquema
const User: Model<InterfaceUser> = mongoose.model<InterfaceUser>(
  "User",
  UserSchema
);

export default User;

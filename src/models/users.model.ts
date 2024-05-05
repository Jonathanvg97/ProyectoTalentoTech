import mongoose, { Schema, Document, Model, Number } from "mongoose";
import { clientTypes } from "../utils/clientTypes.utils";

// Define una interfaz para el modelo de usuario
interface InterfaceUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  clientType: number;
  createUser: Date;
}
// Define el esquema del usuario
const UserSchema: Schema<InterfaceUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  clientType: {
    type: Number,
    required: true,
    enum: Object.keys(clientTypes).map(Number),
  },
  createUser: {
    type: Date,
    default: Date.now(),
  },
});

// Crea y exporta el modelo basado en el esquema
const UserModel: Model<InterfaceUser> = mongoose.model<InterfaceUser>(
  "User",
  UserSchema
);

export default UserModel;

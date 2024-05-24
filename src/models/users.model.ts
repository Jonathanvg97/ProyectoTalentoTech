import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { clientTypes } from "../utils/clientTypes.utils";

// Define una interfaz para el modelo de usuario
interface InterfaceUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  clientType: number;
  matches: Types.ObjectId[];
  createdBusinesses: Types.ObjectId[];
  createUser: Date;
  token?: string;
}

// Define el esquema del usuario
const UserSchema: Schema<InterfaceUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  clientType: {
    type: Number,
    // Hacer el campo opcional y definir un enum solo para usuarios no admin
    enum: Object.keys(clientTypes).map(Number),
    required: function () {
      return this.role !== "admin"; // El campo es requerido si el rol no es admin
    },
  },
  matches: [{ type: Schema.Types.ObjectId, ref: "Match" }],
  createdBusinesses: [
    { type: Schema.Types.ObjectId, ref: "BusinessOpportunity" },
  ],
  createUser: {
    type: Date,
    default: Date.now(),
  },
  token: { type: String, require: false },
});

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    if (ret.role !== "admin") {
      delete ret.createdBusinesses;
    }
    return ret;
  },
});

// Crea y exporta el modelo basado en el esquema
const UserModel: Model<InterfaceUser> = mongoose.model<InterfaceUser>(
  "User",
  UserSchema
);

export default UserModel;

import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Define una interfaz para el modelo de match
interface InterfaceMatch extends Document {
  user: Types.ObjectId;
  business: Types.ObjectId;
  createdAt: Date;
}

// Define el esquema del match
const MatchSchema: Schema<InterfaceMatch> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  business: {
    type: Schema.Types.ObjectId,
    ref: "BusinessOpportunity",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

// Crea y exporta el modelo basado en el esquema
const MatchModel: Model<InterfaceMatch> = mongoose.model<InterfaceMatch>(
  "Match",
  MatchSchema
);

export default MatchModel;

import { industryNames } from "../utils/industryNames.utils";
import { clientTypes } from "./../utils/clientTypes.utils";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Define una interfaz para el modelo de match
interface InterfaceMatch extends Document {
  user: {
    userId: Types.ObjectId;
    userName: string;
    clientType: string;
    response: string; // 'accepted', 'cancelled', 'pending'
  };
  business: {
    businessId: Types.ObjectId;
    businessName: string;
    businessType: string;
    response: string; // 'accepted', 'cancelled', 'pending'
  };
  createdAt: Date;
}

// Define el esquema del match
const MatchSchema: Schema<InterfaceMatch> = new Schema({
  user: {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: {
      type: String,
      ref: "User",
    },
    clientType: {
      type: String,
      enum: Object.keys(clientTypes).map(String),
      ref: "User",
    },
    response: {
      type: String,
      enum: ["accepted", "cancelled", "pending"],
      default: "pending",
    },
  },
  business: {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "BusinessOpportunity",
      required: true,
    },
    businessName: {
      type: String,
      ref: "BusinessOpportunity",
    },
    businessType: {
      type: String,
      enum: Object.keys(industryNames).map(String),
      ref: "BusinessOpportunity",
    },
    response: {
      type: String,
      enum: ["accepted", "cancelled", "pending"],
      default: "pending",
    },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Crea y exporta el modelo basado en el esquema
const MatchModel: Model<InterfaceMatch> = mongoose.model<InterfaceMatch>(
  "Match",
  MatchSchema
);

export default MatchModel;

import mongoose, { Schema, Document, Model } from "mongoose";
import { industryNames } from "../utils/industryNames.utils";

// Interfaz para el modelo de oportunidad
interface Opportunity extends Document {
  title: string;
  description: string;
  status: string;
  industry: number;
  createdAt: Date;
}

// Esquema de oportunidad
const OpportunitySchema: Schema<Opportunity> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  industry: {
    type: Number,
    required: true,
    enum: Object.keys(industryNames).map(Number),
  },
  createdAt: { type: Date, default: Date.now },
});

// Modelo de oportunidad
const businessOpportunityModel: Model<Opportunity> =
  mongoose.model<Opportunity>("BusinessOpportunity", OpportunitySchema);

export default businessOpportunityModel;

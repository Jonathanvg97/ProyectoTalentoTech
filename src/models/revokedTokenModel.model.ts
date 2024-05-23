import mongoose, { Schema, Document } from "mongoose";

interface RevokedToken extends Document {
  token: string;
  expiresAt: Date;
}

const RevokedTokenSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

// Crear un índice TTL en el campo expiresAt
RevokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RevokedTokenModel = mongoose.model<RevokedToken>(
  "RevokedToken",
  RevokedTokenSchema
);

export default RevokedTokenModel;

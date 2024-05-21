import mongoose, { Schema, Document } from "mongoose";

interface RevokedToken extends Document {
  token: string;
}

const RevokedTokenSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
});

const RevokedTokenModel = mongoose.model<RevokedToken>(
  "RevokedToken",
  RevokedTokenSchema
);

export default RevokedTokenModel;

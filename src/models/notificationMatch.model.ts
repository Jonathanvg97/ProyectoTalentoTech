import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface InterfaceNotification extends Document {
  userId: mongoose.Types.ObjectId;
  userMessages: {
    user: string;
    admin: string;
  };
  status: string; // 'pending', 'accepted', 'cancelled'
  acceptedByUser: boolean;
  acceptedByAdmin: boolean;
}

const NotificationMatchSchema: Schema<InterfaceNotification> = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  userMessages: {
    user: { type: String },
    admin: { type: String }
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled"],
    default: "pending",
  },
  acceptedByUser: { type: Boolean, default: false, required: true },
  acceptedByAdmin: { type: Boolean, default: false, required: true },
});

const NotificationMatchModel: Model<InterfaceNotification> =
  mongoose.model<InterfaceNotification>(
    "NotificationMatch",
    NotificationMatchSchema
  );

export default NotificationMatchModel;

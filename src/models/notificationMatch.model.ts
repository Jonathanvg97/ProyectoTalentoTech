import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface InterfaceNotification extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  status: string; // 'pending', 'accepted', 'cancelled'
}

const NotificationMatchSchema: Schema<InterfaceNotification> = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled"],
    default: "pending",
  },
});

const NotificationMatchModel: Model<InterfaceNotification> =
  mongoose.model<InterfaceNotification>(
    "NotificationMatch",
    NotificationMatchSchema
  );

export default NotificationMatchModel;

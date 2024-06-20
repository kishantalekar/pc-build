// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String }, // Assuming you have a userId to associate orders with users
  email: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  additionalNotes: { type: String, default: "" },
  orderId: {
    type: String,
    required: true,
  },
  email: String,
  amount: {
    type: Number,
    required: true,
  },
  products: [
    {
      _id: String,
      name: String,
      price: String,
      description: String,
      img: String,
    },
  ],
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

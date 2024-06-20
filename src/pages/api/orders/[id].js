// pages/api/orders/[id].js

import dbConnect from "../../lib/connectDB";
import Order from "../../../Model/Order";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  console.log(id);
  if (req.method === "PUT") {
    const { status } = req.body;

    try {
      const order = await Order.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        {
          status,
        }
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

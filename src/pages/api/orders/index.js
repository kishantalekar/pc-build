// pages/api/orders/index.js

import dbConnect from "../../lib/connectDB";
import Order from "../../../Model/Order";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

// pages/api/create-order.js

import Razorpay from "razorpay";
import dbConnect from "../lib/connectDB";
import Order from "../../Model/Order";

const razorpay = new Razorpay({
  key_id: "rzp_test_WHDwkn3KLG9Dqe",
  key_secret: "IYsU7N4vkH794kRdGFuKZxWE",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userId,
      email,
      address,
      phoneNumber,
      additionalNotes,
      products,
      amount,
    } = req.body;
    console.log(amount);

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
    };

    try {
      const order = await razorpay.orders.create(options);

      // Connect to MongoDB and save the order
      await dbConnect();

      console.log("first");

      const newOrder = new Order({
        orderId: order.id,
        amount,
        products,
        email,
        userId,
        address,
        phoneNumber,
        additionalNotes,
      });

      await newOrder.save();

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

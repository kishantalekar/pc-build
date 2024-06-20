import { createAccessToken, createRefreshToken } from "@/utils/generateToken";
import User from "../../Model/user";
import connectDB from "../lib/connectDB";
// import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { username, email, password } = req.body;

  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password: password,
    });

    const user = await newUser.save();
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    return res.status(201).json({
      success: true,
      message: "User registration successful'",
      user: user,
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors gracefully
  }
}

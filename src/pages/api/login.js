import { createAccessToken, createRefreshToken } from "@/utils/generateToken";
import User from "../../Model/user";
import connectDB from "../lib/connectDB";
// import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { email, password } = req.body;
  console.log(password, email);
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log(user);
    if (password != user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" }); // Generic message for security
    }
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    return res.status(200).json({
      success: true,
      message: "authentication successfully",
      user: user,
      refresh_token,
      access_token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" }); // Handle errors gracefully
  }
}

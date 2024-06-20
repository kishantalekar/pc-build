import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../utils/generateToken";
import connectDB from "@/pages/lib/connectDB";
import UserModel from "@/Model/user";

export default async (req, res) => {
  console.log("first");
  console.log(req.cookies, "cookies");
  try {
    connectDB();
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Please login now!" });
    console.log("second");

    const result = jwt.verify(
      rf_token,
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET
    );
    console.log("3");

    if (!result)
      return res
        .status(400)
        .json({ err: "Your login session has expired. Please try again!" });

    const user = await UserModel.findById(result.id);
    console.log(user, "fls");
    if (!user) return res.status(400).json({ err: "User does not exist." });
    console.log("4");

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
    console.log("5");
  } catch (err) {
    return res
      .status(500)
      .json({ err: "Sorry. Please Login Again or Contact Us!" });
  }
};

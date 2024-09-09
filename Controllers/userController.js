// first schema want

import user from "../Models/userSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ username, email, password: hashPassword });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User Registered Successfully", result: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration failed Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetail = await user.findOne({ email });
    if (!userDetail) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, userDetail.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Logined Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed Internal server error" });
  }
};

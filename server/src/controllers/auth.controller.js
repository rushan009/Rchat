import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'none',  // required for cross-domain
  secure: true       // required for sameSite: none
})
    return res.status(201).json({
      message: "User registered Successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "No user exists with this email",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Login Credentials doesnot Match",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
  httpOnly: true,
  sameSite: 'none',
  secure: true
});
    return res.status(200).json({
      message: "User Login Successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const logOutUser = async (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  sameSite: 'none',
  secure: true
});
  return res.status(200).json({ message: "Logged out successfully" });
};

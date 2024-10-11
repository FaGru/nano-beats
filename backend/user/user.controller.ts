import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "./user.model";
import mongoose from "mongoose";

const getUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "get user" });
  } catch (error: any) {
    res.status(400).json({ errors: [{ msg: `user.${error.message}` }] });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    // check if user has entered all fields
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ errors: [{ msg: "Please enter all fields" }] });
    }

    // Check for existing user
    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await UserModel.create({ name, email, password: hashPassword });

    if (newUser) {
      res
        .status(201)
        .json({ _id: newUser._id, name: newUser.name, email: newUser.email, token: generateToken(newUser._id) });
    } else {
      res.status(400).json({ errors: [{ msg: "Invalid user data" }] });
    }
  } catch (error: any) {
    res.status(400).json({ errors: [{ msg: `user.${error.message}` }] });
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Check for existing user
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error: any) {
    res.status(400).json({ errors: [{ msg: `user.${error.message}` }] });
  }
};

// generate token
const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

export default { getUser, registerUser, loginUser };

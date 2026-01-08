import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ CREATE JWT (same as login)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;
        // Find user by email
        const existingUser = await User.findOne({ email });
        if(!existingUser){
           return res.status(400).json({ message: "User not exists" });
        }
        //compare password
        const isMatch = await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password"});
        }
        // Generate jwt
        const token = jwt.sign({ id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
        //login successful
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
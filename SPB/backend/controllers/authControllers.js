import User from "../models/User.js";
import { generateHash, CompareHash, generateToken } from "../utils/auth.js";
import { generatePortfolio } from "../utils/generatePortfolioInitialy.js";
import cookie from "cookie";
// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, userName, email, phone, password, } = req.body;

    if (!password) {
      throw Error('Password is required');
    }

    const hashedPassword = await generateHash(password);
    if (!hashedPassword) {
      throw Error('Error please try again');
    }
    const newUser = {
      name,
      userName,
      email,
      phone,
      password: hashedPassword
    };
    const savedUser = await User.create(newUser);
    const portfolio = await generatePortfolio(savedUser);
    return res.status(200).json({ message: 'Account Created Successfully', user: newUser, portfolio: portfolio });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials Provided" });
    }

    // 2. Compare password
    const isMatch = await CompareHash(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials Provided" });
    }

    // 3. Generate JWT
    const jwtToken = await generateToken(user._id, user.userName);

    // 4. Set HttpOnly cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    // 5. Return safe user info (don’t expose password!)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message:err.message });
  }
};


export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 0
  });
  res.status(200).json({ message: "Logout successful" });
}

export const getUserById = async (req, res) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(200).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
}
import User from '../Models/User.js';
import { configDotenv } from 'dotenv';
import GenerateHash from '../lib/generateHash.js';
import CompareHash from '../lib/compareHash.js';
import generateToken from '../lib/generateToken.js';

// Load env variables
configDotenv();


// Create a new user
export const createUser = async (req, res) => {
  try {

    const { password, ...data } = req.body;
    const hashedPassword = await GenerateHash(password);
    const newUser = {
      password: hashedPassword,
      ...data
    }
    const savedUser = await User.create(newUser);
    return res.status(200).json({ message: 'Account Created Successfully', user: savedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }

}


// Login An existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json('Invaild Credentials Provided')
  }
  const isMatch = await CompareHash(password, user.password);

  if (!isMatch) {
    return res.status(401).json('Invaild Credentials Provided');
  }

  const token = generateToken(user._id, user.role);
  if (!token) {
    return res.status(500).json('Error Occured please try agani');
  }
  // 4. Set HttpOnly cookie
  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: 'Login Successfull',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  })

}


// Update an exisiting user
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const user = await User.findOneAndUpdate({ _id: userId }, data, { new: true });
    if (!user) {
      throw new Error("Error occoured while updating pleas try again");
    }
    return res.status(200).json({ message: "Profile Successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Get User by Id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({ message: 'User fetched successfully', user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

}

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ message: "Users fetched Successfully", users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


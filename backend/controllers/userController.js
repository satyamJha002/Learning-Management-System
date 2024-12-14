import User from "../models/user.js";
import Course from "../models/courses.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existUsername = await User.findOne({ username });

    if (existUsername) {
      return res.status(400).json({ message: "User already exist" });
    }

    const genSalt = 10;
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      message: "Successfull created user",
      user: {
        id: newUser._id,
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error to creating User" });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(404).json({ messaage: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        password: user.password,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Logged In successfully",
      user: {
        id: user._id,
        username: user.username,
        password: user.password,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error coming in log in" });
    console.log(error);
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Enrolled courses retrieved successfully",
      courses: user.enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred while fetching enrolled courses",
    });
    console.error(error);
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course retrieved successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error occurred while fetching the course",
    });
  }
};

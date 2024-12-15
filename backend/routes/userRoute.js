import express from "express";
import {
  createUser,
  getEnrolledCourses,
  getSingleCourse,
  getUserDetails,
  loginUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/user/:id", authenticateToken, getUserDetails);
router.post("/user/enrolled-courses", authenticateToken, getEnrolledCourses);
router.get("/user/courses/:id", authenticateToken, getSingleCourse);

export default router;

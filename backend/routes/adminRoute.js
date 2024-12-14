import express from "express";
import {
  addCourse,
  deleteCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
} from "../controllers/adminController.js";
import { checkAdminRole } from "../middleware/roleMiddleware.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/courses", authenticateToken, checkAdminRole, addCourse);
router.get("/courses", authenticateToken, getCourses);
router.put(
  "/admin/courses/:id",
  authenticateToken,
  checkAdminRole,
  updateCourse
);
router.get(
  "/admin/courses/:id",
  authenticateToken,
  checkAdminRole,
  getSingleCourse
);
router.delete(
  "/admin/courses/:id",
  authenticateToken,
  checkAdminRole,
  deleteCourse
);

export default router;

import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  register,
  login,
  logout
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post(
  "/logout",
  authenticate,
  logout
);

router.get("/me", authenticate, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user
  });
});

export default router;
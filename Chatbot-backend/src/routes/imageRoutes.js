import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";
import { generateImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/:chatId/images", authenticate, generateImage);

export default router;
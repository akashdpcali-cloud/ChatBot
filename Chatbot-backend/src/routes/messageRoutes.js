import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/:chatId/messages", authenticate, sendMessage);
router.get("/:chatId/messages", authenticate, getMessages);

export default router;
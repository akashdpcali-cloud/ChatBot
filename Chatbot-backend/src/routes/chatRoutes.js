import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";
import { createChat, getChats, deleteChat, updateChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", authenticate, createChat);
router.get("/", authenticate, getChats);
router.delete("/:chatId", authenticate, deleteChat);
router.put("/:chatId", authenticate, updateChat);

export default router;  
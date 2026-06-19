import prisma from "../config/prisma.js";

export const createConversation = async (req, res) => {
  try {
    const { title } = req.body;

    const conversation = await prisma.conversation.create({
      data: { title }
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
import prisma from "../config/prisma.js";
import { generateResponse } from "../services/groqService.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Message content is required"
      });
    }

    const chat = await prisma.conversation.findFirst({
      where: {
        id: chatId,
        userId: req.user.userId
      }
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found"
      });
    }

    const userMessage = await prisma.message.create({
      data: {
        conversationId: chatId,
        role: "user",
        content
      }
    });

    const messageCount = await prisma.message.count({
      where: {
        conversationId: chatId
      }
    });

    if (messageCount === 1) {
      await prisma.conversation.update({
        where: {
          id: chatId
        },
        data: {
          title: content.slice(0, 50)
        }
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: chatId
      },
      orderBy: {
        createdAt: "asc"
      },
      select: {
        role: true,
        content: true
      }
    });

    const aiResponse = await generateResponse(messages);

    const assistantMessage = await prisma.message.create({
      data: {
        conversationId: chatId,
        role: "assistant",
        content: aiResponse
      }
    });

    return res.status(201).json({
      message: assistantMessage
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await prisma.conversation.findFirst({
      where: {
        id: chatId,
        userId: req.user.userId
      }
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found"
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: chatId
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return res.status(200).json(messages);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
import prisma from "../config/prisma.js";

export const generateImage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Prompt is required"
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

    await prisma.message.create({
      data: {
        conversationId: chatId,
        role: "user",
        type: "text",
        content: prompt
      }
    });

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    await prisma.message.create({
      data: {
        conversationId: chatId,
        role: "assistant",
        type: "image",
        content: imageUrl
      }
    });

    return res.status(200).json({
      imageUrl
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
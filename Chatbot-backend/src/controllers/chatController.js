import prisma from "../config/prisma.js";

export const createChat = async (req, res) => {
  try {
    const chat = await prisma.conversation.create({
      data: {
        userId: req.user.userId
      }
    });

    return res.status(201).json(chat);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await prisma.conversation.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        title: true,
        createdAt: true
      }
    });

    return res.status(200).json(chats);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const deleteChat = async (req, res) => {
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

    await prisma.conversation.delete({
      where: {
        id: chatId
      }
    });

    return res.status(200).json({
      message: "Chat deleted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required"
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

    const updatedChat = await prisma.conversation.update({
      where: {
        id: chatId
      },
      data: {
        title: title.trim()
      }
    });

    return res.status(200).json(updatedChat);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
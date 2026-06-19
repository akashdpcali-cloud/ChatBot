import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedUsername.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Invalid email address"
      });
    }


    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: normalizedUsername },
          { email: normalizedEmail }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
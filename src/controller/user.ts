import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const adminLogin = async (req: Request, res: Response): Promise<void> => {    
  try {
    const { email } = req.body;

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not established");
    }
    const usersCollection = db.collection("users");
    const userData = await usersCollection.findOne({ email });

    if (!userData) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const token = jwt.sign(
      { id: userData._id, email: userData.email, role: userData.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "24h" }
    );

    await usersCollection.updateOne({ email }, { $set: { token } });

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

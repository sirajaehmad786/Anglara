import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";
import { Db, Collection } from "mongodb";


export const verifyAdminToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization
    
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string; email: string; role: string };
    if (!mongoose.connection.readyState) {
      res.status(500).json({ success: false, message: "Database connection is not established" });
      return;
    }
    const db: Db = mongoose.connection.db as Db;
    const usersCollection: Collection = db.collection("users");
    const userData = await usersCollection.findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });

    if (!userData) {
      res.status(401).json({ success: false, message: "Unauthorized: User not found" });
      return;
    }

    if (userData.role !== "admin") {
      res.status(403).json({ success: false, message: "Access denied: Only admin users can access this" });
      return;
    }

    (req as any).user = userData;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token"
    });
  }
};

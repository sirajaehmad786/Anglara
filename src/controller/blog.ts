import { NextFunction, Request, Response } from "express";
import Blog from "../model/blog";
import mongoose from "mongoose";

export const addBlog = async (req: Request, res: Response,next: NextFunction)=> {
    try {
        const { title, content, tags } = req.body;

        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            res.status(400).json({
                success: false,
                message: "Blog title already exists",
            });
        }

        const newBlog = new Blog({ title, content, tags });
        await newBlog.save();

         res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog,
        });

    } catch (error) {
        next(error);
    }
};



export const getAllPost = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const findAllPost = await Blog.find({ isDelete: false })
        res.status(200).send({
            status: true,
            message: "Get all blog succesfully",
            data: findAllPost
        })
    } catch (error) {
        next(error);
    }
}

export const getByIdPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid blog ID format",
            });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Blog post get successfully",
            data: blog,
        });

    } catch (error) {
        next(error);
    }
}


export const updateBlog = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    try {
        const { id } = req.params;
        const { title, content, tags } = req.body;
        if (title) {
            const existingBlog = await Blog.findOne({ title, _id: { $ne: id } });
            if (existingBlog) {
                res.status(400).json({ success: false, message: "Title already exists" });
            }
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, tags }, { new: true });
        if (!updatedBlog) {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, message: "Blog updated", data: updatedBlog });
    } catch (error) {
        next(error);
    }
}


export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid blog ID format",
            });
        }
        const blog = await Blog.findByIdAndUpdate(
            id,
            { isDelete: true },
            { new: true }
        );

        if (!blog) {
            res.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog post soft deleted successfully",
            data: blog,
          });
    } catch (error) {
        next(error);
    }
}
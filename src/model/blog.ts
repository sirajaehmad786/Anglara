import mongoose, { Schema, Document } from "mongoose";

export interface Blog extends Document {
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isDelete: boolean;
}

const BlogSchema: Schema = new Schema<Blog>({
  title: { type: String, required: true, trim: true,unique: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDelete: { type: Boolean, default: false },
});

const Blog = mongoose.model<Blog>("Blog", BlogSchema);

export default Blog;

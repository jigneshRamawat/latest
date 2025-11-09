// Server/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    public_id: String,
    url: String
  }
}, { timestamps: true });

export default mongoose.model("Post", postSchema);

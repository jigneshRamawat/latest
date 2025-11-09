// Server/routes/postRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import path from "path";

const router = express.Router();

// Multer temp storage (keeps files in uploads/ locally, will be deleted after upload)
const upload = multer({ dest: "uploads/" });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // if file exists upload to cloudinary
    let imageData = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "posts" });
      imageData = { public_id: result.public_id, url: result.secure_url };
      fs.unlinkSync(req.file.path);
    }

    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: imageData
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // If new image uploaded, delete old from Cloudinary then upload new
    if (req.file) {
      if (post.image && post.image.public_id) {
        try {
          await cloudinary.uploader.destroy(post.image.public_id);
        } catch (e) {
          console.warn("Cloudinary delete warning:", e);
        }
      }
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "posts" });
      post.image = { public_id: result.public_id, url: result.secure_url };
      fs.unlinkSync(req.file.path);
    }

    // update other fields
    post.title = req.body.title ?? post.title;
    post.description = req.body.description ?? post.description;

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(post.image.public_id);
      } catch (e) {
        console.warn("Cloudinary delete warning:", e);
      }
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

export default router;

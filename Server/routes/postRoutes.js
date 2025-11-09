import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

// ✅ Multer setup (temporary local storage)
const upload = multer({ dest: "uploads/" });

// ✅ CREATE POST
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
    });

    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    fs.unlinkSync(req.file.path); // delete local temp image
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
});

// ✅ UPDATE POST (and delete old image)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Delete old image if new uploaded
    if (req.file && post.image?.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }

    let imageData = post.image;

    // Upload new image
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      imageData = { public_id: result.public_id, url: result.secure_url };
      fs.unlinkSync(req.file.path);
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.image = imageData;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update post" });
  }
});

// ✅ DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Delete image from Cloudinary
    if (post.image?.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

export default router;

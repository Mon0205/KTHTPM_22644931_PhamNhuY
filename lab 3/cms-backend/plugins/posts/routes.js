import express from "express";
import { getAllPosts, createPost, deletePost } from "./service.js";

export default function registerPostsPlugin(app) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const posts = await getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
      }

      const post = await createPost(title, content || "");
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await deletePost(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.use("/api/posts", router);
}

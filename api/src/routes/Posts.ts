import express from "express";
import * as Post from "../models/Post.js";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
  try {
    const result = await Post.listPosts();
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});
postsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await Post.getPost(id);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching post");
  }
});
postsRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.send(await Post.deletePost(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
});
postsRouter.post("/", async (req, res) => {
  try {
    const c = new Post.PostInsertable(req.body);
    res.send(await c.create());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating post");
  }
});
postsRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const c = new Post.PostInsertable(req.body);
    res.send(await c.update(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});
postsRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    res.send(await Post.patchPost(id, data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error patching post");
  }
});

export default postsRouter;

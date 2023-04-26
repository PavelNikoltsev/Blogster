import express from "express";
import * as Comment from "../models/Comment.js";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
  try {
    const result = await Comment.listComments();
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching comments");
  }
});
commentsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await Comment.getComment(id);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching comment");
  }
});
commentsRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.send(await Comment.deleteComment(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting comment");
  }
});
commentsRouter.post("/", async (req, res) => {
  try {
    const c = new Comment.CommentInsertable(req.body);
    res.send(await c.create());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating comment");
  }
});
commentsRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const c = new Comment.CommentInsertable(req.body);
    res.send(await c.update(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating comment");
  }
});
commentsRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    res.send(await Comment.patchComment(id, data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error patching comment");
  }
});

export default commentsRouter;

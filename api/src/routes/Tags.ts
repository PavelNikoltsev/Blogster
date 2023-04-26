import express from "express";
import * as Tag from "../models/Tag.js";

const tagsRouter = express.Router();

tagsRouter.get("/", async (req, res) => {
  try {
    const result = await Tag.listTags();
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tags");
  }
});
tagsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await Tag.getTag(id);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tag");
  }
});
tagsRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.send(await Tag.deleteTag(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting tag");
  }
});
tagsRouter.post("/", async (req, res) => {
  try {
    const c = new Tag.TagInsertable(req.body);
    res.send(await c.create());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating tag");
  }
});
tagsRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const c = new Tag.TagInsertable(req.body);
    res.send(await c.update(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating tag");
  }
});
tagsRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    res.send(await Tag.patchTag(id, data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error patching tag");
  }
});

export default tagsRouter;

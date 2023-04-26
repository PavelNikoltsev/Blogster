import express from "express";
import * as Page from "../models/Page.js";

const pagesRouter = express.Router();

pagesRouter.get("/", async (req, res) => {
  try {
    const result = await Page.listPages();
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching pages");
  }
});
pagesRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await Page.getPage(id);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching page");
  }
});
pagesRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.send(await Page.deletePage(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting page");
  }
});
pagesRouter.post("/", async (req, res) => {
  try {
    const c = new Page.PageInsertable(req.body);
    res.send(await c.create());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating page");
  }
});
pagesRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const c = new Page.PageInsertable(req.body);
    res.send(await c.update(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating page");
  }
});
pagesRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    res.send(await Page.patchPage(id, data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error patching page");
  }
});

export default pagesRouter;

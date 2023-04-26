import express from "express";
import * as Category from "../models/Category.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
  try {
    const result = await Category.listCategories();
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
});
categoriesRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await Category.getCategory(id);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching category");
  }
});
categoriesRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.send(await Category.deleteCategory(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting category");
  }
});
categoriesRouter.post("/", async (req, res) => {
  try {
    const c = new Category.CategoryInsertable(req.body);
    res.send(await c.create());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating category");
  }
});
categoriesRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const c = new Category.CategoryInsertable(req.body);
    res.send(await c.update(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating category");
  }
});
categoriesRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    res.send(await Category.patchCategory(id, data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error patching category");
  }
});

export default categoriesRouter;

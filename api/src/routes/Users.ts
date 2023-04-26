import express from "express";
import * as User from "../models/User.js";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const result = await User.listUsers();
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});
usersRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await User.getUser(id);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
});
usersRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    res.send(await User.deleteUser(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});
usersRouter.post("/", async (req, res) => {
  try {
    const c = new User.UserInsertable(req.body);
    res.send(await c.create());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});
usersRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const c = new User.UserInsertable(req.body);
    res.send(await c.update(id));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});
usersRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    res.send(await User.patchUser(id, data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error patching user");
  }
});

export default usersRouter;

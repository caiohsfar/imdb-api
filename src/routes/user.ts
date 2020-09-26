import express from "express";
import UserController from "../controllers/user";
import database from "../../src/database/connection";

const itemsRouter = express.Router();

const itemsController = new UserController();

itemsRouter.get("/", (req, res) => itemsController.index(req, res));

export default itemsRouter;

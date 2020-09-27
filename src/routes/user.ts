import express from "express";
import UsersController from "../controllers/users";
import database from "../../src/database/connection";

const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get("/", (req, res) => usersController.index(req, res));

export default usersRouter;

import express from "express";
import UsersController from "../controllers/users";
import AuthMiddleware from "../middlewares/auth";

const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.put("/update/:userId", AuthMiddleware.verifyToken, (req, res) =>
  usersController.update(req, res)
);
usersRouter.put("/delete/:userId", AuthMiddleware.verifyToken, (req, res) =>
  usersController.delete(req, res)
);

export default usersRouter;

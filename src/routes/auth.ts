import express from "express";
import AuthController from "../controllers/auth";
import { Request, Response } from "express";
import database from "../../src/database/connection";
import AuthMiddleware from "../middlewares/auth";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post(
  "/singup",
  [AuthMiddleware.checkRolesExists, AuthMiddleware.checkDuplicateEmail],
  (req: Request, res: Response) => authController.singUp(req, res)
);

authRouter.post("/login", (req: Request, res: Response) =>
  authController.login(req, res)
);

export default authRouter;

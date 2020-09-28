import express from "express";
import MovieController from "../controllers/movie";
import { Request, Response } from "express";
import AuthMiddleware from "../middlewares/auth";

const movieRouter = express.Router();

const movieController = new MovieController();

movieRouter.get(
  "/",
  [AuthMiddleware.verifyToken],
  (req: Request, res: Response) => movieController.index(req, res)
);

movieRouter.post(
  "/",
  [AuthMiddleware.verifyToken, AuthMiddleware.isAdmin],
  (req: Request, res: Response) => movieController.create(req, res)
);

movieRouter.post(
  "/rate",
  [AuthMiddleware.verifyToken, AuthMiddleware.isUser],
  (req: Request, res: Response) => movieController.rate(req, res)
);

export default movieRouter;

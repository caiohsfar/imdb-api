import express from "express";
import rootRouter from "./root";
import userRouter from "./user";
import authRouter from "./auth";
import movieRouter from "./movie";

const router: express.Router = express.Router();

router.use("/", rootRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/movie", movieRouter);

export default router;

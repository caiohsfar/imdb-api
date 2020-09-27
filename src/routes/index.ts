import express from "express";
import rootRouter from "./root";
import userRouter from "./user";
import authRouter from "./auth";

const router: express.Router = express.Router();

router.use("/", rootRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;

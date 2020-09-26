import express from "express";
import rootRouter from "./root";
import userRouter from "./user";

const router: express.Router = express.Router();

router.use("/", rootRouter);
router.use("/user", userRouter);

export default router;

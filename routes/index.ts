import express from "express";
import studyRouter from "./study/controller";
import reactionRouter from "./reaction/controller";
import habitRouter from "./habit/controller";

const router = express.Router();

router.use("/study", studyRouter);
router.use("/reaction", reactionRouter);
router.use("/habit", habitRouter);

export default router;

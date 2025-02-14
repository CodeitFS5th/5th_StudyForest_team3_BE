import express from "express";
import studyRouter from "./controllers/study";
import habitRouter from "./controllers/habit";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from the Express Router!");
});

router.use("/study", studyRouter);
router.use("/habit", habitRouter);

export default router;

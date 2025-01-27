import express from "express";
import {
  getStudyList,
  getStudy,
  createStudy,
  updateStudy,
  deleteStudy,
  addFocusPoint,
} from "./service";

const router = express.Router();

router.get("/", getStudyList);
router.get("/:id", getStudy);
router.post("/", createStudy);
router.put("/:id", updateStudy);
router.delete("/:id", deleteStudy);

router.post("/focus", addFocusPoint); // /study/focus

export default router;

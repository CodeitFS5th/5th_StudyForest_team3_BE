import express from "express";
import getStudyList from "../services/study/getStudyList";
import getStudy from "../services/study/getStudy";
import addFocusPoint from "../services/focus/addFocusPoint";
import createStudy from "../services/study/createStudy";
import updateStudy from "../services/study/updateStudy";
import deleteStudy from "../services/study/deleteStudy";

const router = express.Router();

router.get("/", getStudyList);
router.get("/:id", getStudy);
router.post("/", createStudy);
router.patch("/:id", updateStudy);
router.delete("/:id", deleteStudy);

router.post("/focus", addFocusPoint); // /study/focus

export default router;

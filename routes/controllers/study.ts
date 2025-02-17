import express from "express";
import getStudyList from "../services/study/getStudyList";
import getStudy from "../services/study/getStudy";
import addFocusPoint from "../services/focus/addFocusPoint";
import createStudy from "../services/study/createStudy";
import updateStudy from "../services/study/updateStudy";
import deleteStudy from "../services/study/deleteStudy";
import authStudyPassword from "../services/study/authStudyPassword";
import createHabit from "../services/habit/createHabit";
import updateHabits from "../services/habit/updateHabits";
import createReaction from "../services/reaction/createReaction";
import getHabitLogList from "../services/habit/getHabitLogList";
import getHabitList from "../services/habit/getHabitList";

const router = express.Router();

router.get("/", getStudyList);
router.get("/:id", getStudy);
router.post("/", createStudy);
router.patch("/:id", updateStudy);
router.delete("/:id", deleteStudy);

router.post("/focus", addFocusPoint); // /study/focus

router.post("/:id/auth", authStudyPassword); // /study/:id/auth

router.get("/:id/habit-log-list", getHabitLogList); // /study/:id/habit
router.get("/:id/habit", getHabitList); // /study/:id/habit
router.post("/:id/habit", createHabit);
router.patch("/:id/habit", updateHabits); // /study/:id/habit

router.post("/:id/reaction", createReaction); // /study/:id/reaction

export default router;

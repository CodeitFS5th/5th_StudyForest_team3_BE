import express from "express";
import getHabitList from "../services/habit/getHabitList";
import createHabit from "../services/habit/createHabit";
import updateHabit from "../services/habit/updateHabit";
import deleteHabit from "../services/habit/deleteHabit";

const router = express.Router();

router.get("/", getHabitList);
router.post("/", createHabit);
router.patch("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;

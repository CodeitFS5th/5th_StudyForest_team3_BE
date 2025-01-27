import express from "express";
import { getHabitList, createHabit, updateHabit, deleteHabit } from "./service";

const router = express.Router();

router.get("/", getHabitList);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;

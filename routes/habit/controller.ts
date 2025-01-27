import express from "express";
import {
  getHabitList,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
} from "./service";

const router = express.Router();

router.get("/", getHabit);
router.get("/:id", getHabit);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;

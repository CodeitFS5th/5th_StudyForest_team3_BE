import express from "express";
import deleteHabit from "../services/habit/deleteHabit";
import toggleHabitLog from "../services/habit/toggleHabitLog";

const router = express.Router();

router.delete("/:id", deleteHabit);
router.post("/:id/log/toggle", toggleHabitLog);

export default router;

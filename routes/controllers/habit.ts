import express from "express";
import updateHabit from "../services/habit/updateHabit";
import deleteHabit from "../services/habit/deleteHabit";
import toogleHabitLog from "../services/habit/toggleHabitLog";

const router = express.Router();

router.patch("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.post("/:id/log/toggle", toogleHabitLog);

export default router;

import express from "express";
import updateHabit from "../services/habit/updateHabit";
import deleteHabit from "../services/habit/deleteHabit";

const router = express.Router();

router.patch("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;

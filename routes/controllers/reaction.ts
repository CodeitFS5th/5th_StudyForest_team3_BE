import express from "express";
import { createReaction } from "../services/reaction/createReaction";

const router = express.Router();

router.post("/", createReaction);

export default router;

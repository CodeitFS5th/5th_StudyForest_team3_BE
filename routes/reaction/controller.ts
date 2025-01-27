import express from "express";
import { createReaction } from "./service";

const router = express.Router();

router.post("/", createReaction);

export default router;

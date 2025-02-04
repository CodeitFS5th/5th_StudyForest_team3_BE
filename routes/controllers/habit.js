"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getHabitList_1 = __importDefault(require("../services/habit/getHabitList"));
const createHabit_1 = __importDefault(require("../services/habit/createHabit"));
const updateHabit_1 = __importDefault(require("../services/habit/updateHabit"));
const deleteHabit_1 = __importDefault(require("../services/habit/deleteHabit"));
const router = express_1.default.Router();
router.get("/", getHabitList_1.default);
router.post("/", createHabit_1.default);
router.patch("/:id", updateHabit_1.default);
router.delete("/:id", deleteHabit_1.default);
exports.default = router;

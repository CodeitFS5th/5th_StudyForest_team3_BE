"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const study_1 = __importDefault(require("./controllers/study"));
const reaction_1 = __importDefault(require("./controllers/reaction"));
const habit_1 = __importDefault(require("./controllers/habit"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello from the Express Router!");
});
router.use("/study", study_1.default);
router.use("/reaction", reaction_1.default);
router.use("/habit", habit_1.default);
exports.default = router;

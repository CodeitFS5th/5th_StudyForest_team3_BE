"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getStudyList_1 = __importDefault(require("../services/study/getStudyList"));
const getStudy_1 = __importDefault(require("../services/study/getStudy"));
const addFocusPoint_1 = __importDefault(require("../services/focus/addFocusPoint"));
const createStudy_1 = __importDefault(require("../services/study/createStudy"));
const updateStudy_1 = __importDefault(require("../services/study/updateStudy"));
const deleteStudy_1 = __importDefault(require("../services/study/deleteStudy"));
const router = express_1.default.Router();
router.get("/", getStudyList_1.default);
router.get("/:id", getStudy_1.default);
router.post("/", createStudy_1.default);
router.patch("/:id", updateStudy_1.default);
router.delete("/:id", deleteStudy_1.default);
router.post("/focus", addFocusPoint_1.default); // /study/focus
exports.default = router;

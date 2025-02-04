"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const index_2 = require("./middleware/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", index_1.default); // 라우터 세팅
app.use((err, req, res, next) => {
    (0, index_2.errorHandler)(err, req, res, next);
}); // 에러 처리
exports.default = app;

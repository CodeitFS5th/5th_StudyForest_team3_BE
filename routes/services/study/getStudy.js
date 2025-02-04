"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const getStudy = async (req, res, next) => {
    // 스터디 상세 조회
    try {
        const studyId = Number(req.params.id);
        const study = await prisma_1.default.study.findUnique({
            where: {
                id: studyId,
            },
        });
        if (!study) {
            res.status(404).send("스터디가 존재하지 않습니다!");
            return;
        }
        res.status(200).send(study);
    }
    catch (error) {
        next(error);
    }
};
exports.default = getStudy;

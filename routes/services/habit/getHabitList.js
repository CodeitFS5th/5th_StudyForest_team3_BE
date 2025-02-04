"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getHabitList = async (req, res, next) => {
    try {
        const { studyId, studyPassword } = req.body;
        // Error: studyId, studyPassword 둘 중 하나라도 없으면 에러 발생
        if (!studyId || !studyPassword) {
            res
                .status(400)
                .send({ message: "studyId 또는 studyPassword가 없습니다!" });
            return;
        }
        const study = await prisma_1.default.study.findUnique({
            where: {
                id: studyId,
            },
        });
        // Error: studyID에 해당하는 스터디가 없으면 에러 발생
        if (!study) {
            res.status(404).send({ message: "스터디가 존재하지 않습니다!" });
            return;
        }
        // Error: studyPassword가 일치하지 않으면 에러 발생
        const isPasswordValid = await bcrypt_1.default.compare(studyPassword, study.password);
        if (!isPasswordValid) {
            res.status(401).send({ message: "스터디 비밀번호가 일치하지 않습니다!" });
            return;
        }
        const habitList = await prisma_1.default.habit.findMany({
            where: {
                study_id: studyId,
            },
        });
        // Error: 습관이 존재하지 않으면 에러 발생
        if (habitList.length === 0) {
            res.status(404).send({ message: "습관이 존재하지 않습니다!" });
            return;
        }
        res
            .status(200)
            .send({ message: "습관 목록 조회 결과입니다!", data: habitList });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getHabitList;

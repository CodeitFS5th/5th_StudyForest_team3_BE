"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const deleteStudy = async (req, res, next) => {
    try {
        const studyId = Number(req.params.id); // uuid로 변경 시 타입 변경 필요
        const { studyPassword, reason } = req.body;
        const study = await prisma_1.default.study.findUnique({
            where: {
                id: studyId,
                deletedAt: {
                    equals: null,
                    // DateTime 필드에서는 equals, lt, gt, gte, lte와 같은 연산자를 사용해야 합니다.
                    // undefined 값은 Prisma에서 자동으로 처리되지 않기 때문에, undefined 조건을 포함하는 쿼리는 작성할 수 없습니다.
                },
            },
        });
        // Error: 삭제할 스터디가 존재하지 않으면 에러 발생
        if (!study) {
            res.status(404).send({ message: "삭제할 스터디가 존재하지 않습니다!" });
            return;
        }
        // Error: studyPassword를 req.body에서 받지 않으면 에러 발생
        if (!studyPassword) {
            res.status(400).send({ message: "스터디 비밀번호가 없습니다!" });
            return;
        }
        // Error: studyPassword가 일치하지 않으면 에러 발생
        const isPasswordValid = await bcrypt_1.default.compare(studyPassword, study.password);
        if (!isPasswordValid) {
            res.status(401).send({ message: "스터디 비밀번호가 일치하지 않습니다!" });
            return;
        }
        const now = new Date();
        const [updatedStudy, createdDeleteLog] = await prisma_1.default.$transaction([
            prisma_1.default.study.update({
                where: {
                    id: studyId,
                },
                data: {
                    deletedAt: now,
                },
                select: {
                    id: true,
                    nick: true,
                    name: true,
                    description: true,
                    deletedAt: true,
                },
            }),
            prisma_1.default.studyDeleteLog.create({
                data: {
                    studyId,
                    deletedAt: now,
                    ...(reason && { reason }),
                },
            }),
        ]);
        res.status(200).send({
            message: "스터디가 삭제되었습니다!",
            data: { ...updatedStudy, ...(reason && { reason }) },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteStudy;

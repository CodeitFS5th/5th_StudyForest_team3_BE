"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const deleteStudy = async (req, res, next) => {
    try {
        const studyId = Number(req.params.id); // uuid로 변경 시 타입 변경 필요
        const { reason } = req.body;
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
        if (!study) {
            // 미들웨어 사용을 위해 error 객체를 throw
            const error = new Error("삭제할 스터디가 존재하지 않습니다!"); // error 클래스를 정의해두는 것도 좋을 듯!
            error.status = 404;
            throw error;
        }
        const now = new Date();
        await prisma_1.default.$transaction([
            prisma_1.default.study.update({
                where: {
                    id: studyId,
                },
                data: {
                    deletedAt: now,
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
        res.status(200).send("스터디가 삭제되었습니다!");
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteStudy;

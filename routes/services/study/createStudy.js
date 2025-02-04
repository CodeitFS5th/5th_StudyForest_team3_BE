"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const s = __importStar(require("superstruct"));
const struct_1 = require("../../../struct");
const createStudy = async (req, res, next) => {
    // 스터디 만들기
    try {
        s.assert(req.body, struct_1.CreateStudy);
        const { nick, name, description, password, background } = req.body;
        if (!nick || !name || !description || !password || !background) {
            res
                .status(400)
                .send({ message: "스터디 생성 필수 요소가 누락되었습니다." });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const study = await prisma_1.default.study.create({
            data: {
                nick,
                name,
                description,
                password: hashedPassword,
                background,
            },
        });
        res.status(201).send(study);
    }
    catch (error) {
        next(error);
    }
};
exports.default = createStudy;

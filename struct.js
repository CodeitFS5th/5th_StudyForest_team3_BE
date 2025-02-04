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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchStudy = exports.CreateStudy = void 0;
const s = __importStar(require("superstruct"));
var ImageType;
(function (ImageType) {
    ImageType["GREEN"] = "GREEN";
    ImageType["YELLOW"] = "YELLOW";
    ImageType["BLUE"] = "BLUE";
    ImageType["RED"] = "RED";
    ImageType["PHOTO_1"] = "PHOTO_1";
    ImageType["PHOTO_2"] = "PHOTO_2";
    ImageType["PHOTO_3"] = "PHOTO_3";
})(ImageType || (ImageType = {}));
exports.CreateStudy = s.object({
    nick: s.size(s.string(), 1, 6), // 닉네임: max length 6
    name: s.size(s.string(), 1, 100), // 제목: max length 100
    description: s.size(s.string(), 1, 100), // 설명: max length 100
    password: s.size(s.string(), 8, 100), // 비밀번호: min length 8
    background: s.enums(Object.values(ImageType)), // 배경 이미지: enum ImageTypeValues
});
exports.PatchStudy = s.partial(exports.CreateStudy);

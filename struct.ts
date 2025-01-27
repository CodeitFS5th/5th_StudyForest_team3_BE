import * as s from "superstruct";

enum ImageType {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  BLUE = "BLUE",
  RED = "RED",
  PHOTO_1 = "PHOTO_1",
  PHOTO_2 = "PHOTO_2",
  PHOTO_3 = "PHOTO_3",
}

export const CreateStudy = s.object({
  nick: s.size(s.string(), 1, 6), // 닉네임: max length 6
  name: s.size(s.string(), 1, 100), // 제목: max length 100
  description: s.size(s.string(), 1, 100), // 설명: max length 100
  password: s.size(s.string(), 8, 100), // 비밀번호: min length 8
  background: s.enums(Object.values(ImageType)), // 배경 이미지: enum ImageTypeValues
});
export const PatchStudy = s.partial(CreateStudy);

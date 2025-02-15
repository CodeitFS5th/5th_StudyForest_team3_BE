import express, { Request, Response, NextFunction } from "express";
import router from "./routes/index";
import { errorHandler } from "./middleware/index";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// cors
app.use(cors({
  origin: process.env.FRONTEND_URL, // 프론트엔드 주소
  credentials: true, // 인증 정보 허용
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router); // 라우터 세팅
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
}); // 에러 처리

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});

export default app;

import express, { Request, Response, NextFunction } from "express";
import router from "./routes/index";
import { errorHandler } from "./middleware/index";
import swaggerUi from "swagger-ui-express"; //ui 설정할 수 있는 모듈 불러오기
import swaggerJson from "./swagger.json"; // api가 세팅된 json파일, yaml 방식도 가능!

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router); // 라우터 세팅
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
}); // 에러 처리

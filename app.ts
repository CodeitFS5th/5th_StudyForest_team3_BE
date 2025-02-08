import express, { Request, Response, NextFunction } from "express";
import router from "./routes/index";
import { errorHandler } from "./middleware/index";

const app = express();

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

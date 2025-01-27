import express from "express";
import router from "./routes/index";
import { errorHandler } from "./middleware/index";

const app = express();

const PORT = process.env.PORT || 8080;
app.set("port", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router); // 라우터 세팅
app.use(errorHandler); // 오류 처리

app.listen(app.get("port"), () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

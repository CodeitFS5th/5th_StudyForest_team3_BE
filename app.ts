import express from "express";
import router from "./routes/index";
import { Iservice } from "./type";

const app = express();

const PORT = process.env.PORT || 8080;
app.set("port", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/", ({ req, res }: Iservice) => {
  res.send("Hello World!");
});

app.listen(app.get("port"), () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

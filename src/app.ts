import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index";
import routes from "./routes/routes";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // 중첩된 객체표현을 허용할지 말지 정하는것
app.use("/", routes);

//db.sequelize.sync();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello, world!!");
});

app.listen(port, async () => {
  console.log("http server on 5000!");
  //authenticate 메소드로 연결 확인
  await db.sequelize
    .authenticate()
    .then(async () => {
      console.log("connection success!!!");
    })
    .catch((e: Error) => {
      console.log(e);
    });
});

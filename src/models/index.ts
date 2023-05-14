import { Sequelize, Op } from "sequelize";
import config from "../config/config";
import Tutorial from "./model";

const sequelizeConfig = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "mysql",
    timezone: "+09:00", // mysql 내부의 디폴트 시간 utc를 한국시간으로 바꿔줌
  }
);

const db: { [key: string]: any } = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeConfig;
db.Op = Op;
db.tutorial = Tutorial(sequelizeConfig);

export default db;

import { Sequelize } from "sequelize";
const config = require("../../config/database");

let sequelize: any;

const enviromment = process.env.NODE_ENV || "production";

if (process.env.NODE_ENV == "test") {
  sequelize = new Sequelize(config.test);
} else {
  sequelize = new Sequelize(config[enviromment]);
}

export default sequelize;

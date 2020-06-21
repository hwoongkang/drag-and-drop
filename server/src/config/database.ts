import { Sequelize } from "sequelize";

const name = process.env.RDS_DB_NAME;
const user = process.env.RDS_USERNAME;
const password = process.env.RDS_PASSWORD;
const host = process.env.RDS_HOSTNAME;

export default new Sequelize(name!, user!, password, {
  host: host,
  dialect: "postgres",
});

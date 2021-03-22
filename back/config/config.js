const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "cali-blog",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "cali-blog",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "cali-blog",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  }
}

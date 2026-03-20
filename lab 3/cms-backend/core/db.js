import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "cms_microkernel",
  waitForConnections: true,
  connectionLimit: 10,
});

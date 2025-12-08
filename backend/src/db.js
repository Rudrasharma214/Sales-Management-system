import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/sales.db");
const db = new Database(dbPath, { fileMustExist: true });

export default db;
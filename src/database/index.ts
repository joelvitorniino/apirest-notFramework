import { Database } from "sqlite3";

export const db = new Database(`${__dirname}/database.sqlite`);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS register (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(45) NOT NULL,
        birth DATE NOT NULL,
        gender CHECK(gender IN ('M', 'F')),
        email VARCHAR(45) NOT NULL
    );`);
});
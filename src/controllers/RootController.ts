import { IncomingMessage, ServerResponse } from "http";
import { db } from "../database";

export class RootController {
    index(request: IncomingMessage, response: ServerResponse) {
        db.all(`SELECT * FROM register`, (err, rows) => {
            try {
                response.setHeader('Content-Type', 'application/json');
                const json = JSON.stringify(rows);
                response.write(json);
                response.end();
            } catch(err) {
                console.error(err);
            }
        });
    };


    store(request: IncomingMessage, response: ServerResponse) {
        request.on('data', (chunk) => {
            const { name, birth, gender, email } = JSON.parse(chunk);
            
            const stmt = db.prepare(
                `INSERT INTO register (name, birth, gender, email) VALUES (?, ?, ?, ?)`
            );

            stmt.run(name, birth, gender, email);
            stmt.finalize();

            response.setHeader('Content-Type', 'application/json');
            const jsonRegister = JSON.stringify({ data: "Register added on success" });

            response.write(jsonRegister);
            response.end();
        });       
    };

    update(request: IncomingMessage, response: ServerResponse) {
        request.on('data', (chunk) => {
            const { id, name, birth, gender, email } = JSON.parse(chunk);
            const stmt = db.prepare(
                `UPDATE register SET name = ?, birth = ?, gender = ?, email = ? WHERE id = ?`
            );

            stmt.run(name, birth, gender, email, id);
            stmt.finalize();
        });

        response.setHeader('Content-Type', 'application/json');
        const jsonUpdate = JSON.stringify({ data: "Register updated on success" });
        
        response.write(jsonUpdate);
        response.end();
    };

    delete(request: IncomingMessage, response: ServerResponse) {
        request.on('data', (chunk) => {
            const { id } = JSON.parse(chunk);
            const stmt = db.prepare(`DELETE FROM register WHERE id = ?`);
            
            stmt.run(id);
            stmt.finalize();

            response.setHeader('Content-Type', 'application/json');
            const jsonDelete = JSON.stringify({ data: "Register deleted on success" });

            response.write(jsonDelete);
            response.end();
        });
    };
};
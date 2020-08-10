import {config} from 'dotenv';
import * as mysql from 'mysql';

config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

class DBConnection {
    private instance: mysql.Connection;

    constructor (instance: mysql.Connection) {
        this.instance = instance;
    }

    public query (sql: string, values: any[]) {
        return new Promise((resolve, reject) => {
            return this.instance.query(sql, values, (err, results, fields) => {
                if (err) {
                    reject(err);
                }

                resolve(results);
            });
        });
    }

    public getInstance() {
        return this.instance;
    }
}

const DB = new DBConnection(db);

export default DB;

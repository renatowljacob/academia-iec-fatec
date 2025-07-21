import { createConnection } from "mysql2/promise";
import { db } from "../config";

async function query(sql, params) {
    const connection = await createConnection(db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

export default {
    query
};

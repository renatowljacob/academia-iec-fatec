import { createConnection } from "mysql2/promise";
import { module } from "../config.js";

async function query(sql, params) {
    const connection = await createConnection(module.db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

export default query;

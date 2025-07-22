import { createConnection } from "mysql2/promise";
import { module } from "../config.js";

export async function query(sql, params) {
    const connection = await createConnection(module.db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

export function filterUndefinedAttrs(obj) {
    const entries = Object.fromEntries(Object.entries(obj).filter(entry => entry[1] !== undefined));
    const keys = Object.keys(entries).join(", ");
    const values = Object.values(entries).map(value =>
        typeof value == "string" ? `'${value}'` : value
    ).join(", ");

    return {
        keys: keys,
        values: values
    }
}

export function makeSetStr(obj) {
    const { keys, values } = filterUndefinedAttrs(obj);
    const keysArr = keys.split(", ");
    const valuesArr = values.split(", ");
    const queryStr = keysArr.map((value, index) => `${value}=${valuesArr[index]}`).join(", ");

    return queryStr;
}

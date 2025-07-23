import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

async function create(admin) {
    const { keys, values } = filterUndefinedAttrs(admin);

    const result = query(
        `INSERT INTO admins
         (${keys})
         VALUES
         (${values})`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, nome, email
         FROM admins`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, nome, email
         FROM admins
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = query(
        `DELETE FROM admins
         WHERE id=${id}`
    );

    return result;
}

async function update(id, admin) {
    const queryStr = makeSetStr(admin);

    const result = query(
        `UPDATE admins
         SET ${queryStr}
         WHERE id=${id}`
    );

    return result;
}

export default {
    create,
    getById,
    getAll,
    remove,
    update
}

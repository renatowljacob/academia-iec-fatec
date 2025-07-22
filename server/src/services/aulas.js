import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

async function create(aulas) {
    const { keys, values } = filterUndefinedAttrs(aulas);
    const results = query(
        `INSERT INTO aulas
         (${keys})
         VALUES
         (${values})`
    );

    return results;
}

async function getById(id) {
    const results = query(
        `SELECT id, nome, professor, horario FROM aulas WHERE id=${id}`
    );

    return results;
}

async function getAll() {
    const results = query(
        `SELECT id, nome, professor, horario FROM aulas`
    );

    return results;
}

async function remove(id) {
    const results = query(
        `DELETE FROM aulas WHERE id=${id}`
    );

    return results;
}

async function update(id, aulas) {
    const queryStr = makeSetStr(aulas);

    const results = query(
        `UPDATE aulas
         SET ${queryStr}
         WHERE id=${id}`
    );

    return results;
}

export default {
    create,
    getById,
    getAll,
    remove,
    update
}

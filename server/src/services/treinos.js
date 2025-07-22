import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

async function create(treino) {
    const { keys, values } = filterUndefinedAttrs(treino);

    const result = query(
        `INSERT INTO treinos
         (${keys})
         VALUES
         (${values})`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, cliente_id, nome, descricao, data_inicio
         FROM treinos`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, cliente_id, nome, descricao, data_inicio
         FROM treinos
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = query(
        `DELETE FROM treinos
         WHERE id=${id}`
    );

    return result;
}

async function update(id, treino) {
    const queryStr = makeSetStr(treino);
    const result = query(
        `UPDATE treinos
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

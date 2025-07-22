import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

async function create(agendamento) {
    const { keys, values } = filterUndefinedAttrs(agendamento);
    const result = query(
        `INSERT INTO agendamentos
         (${keys})
         VALUES
         (${values})`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, cliente_id, aula_id, data
         FROM agendamentos`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, cliente_id, aula_id, data
         FROM agendamentos
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = query(
        `DELETE FROM agendamentos
         WHERE id=${id}`
    );

    return result;
}

async function update(id, agendamento) {
    const queryStr = makeSetStr(agendamento);

    const result = query(
        `UPDATE agendamentos
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

import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

async function create(pagamento) {
    const { keys, values } = filterUndefinedAttrs(pagamento);

    const result = query(
        `INSERT INTO pagamentos
         (${keys})
         VALUES
         (${values})`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, cliente_id, data_pagamento, valor, status
         FROM pagamentos`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, cliente_id, data_pagamento, valor, status
         FROM pagamentos
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = query(
        `DELETE FROM pagamentos
         WHERE id=${id}`
    );

    return result;
}

async function update(id, pagamento) {
    const queryStr = makeSetStr(pagamento);

    const result = query(
        `UPDATE pagamentos
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

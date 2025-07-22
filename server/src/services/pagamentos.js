import { query } from "./db.js";

async function create(pagamento) {
    const result = query(
        `INSERT INTO pagamentos
         (cliente_id, data_pagamento, valor, status)
         VALUES
         (${pagamento.cliente_id}, ${pagamento.data_pagamento}, ${pagamento.valor}, '${pagamento.status}')`
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
    const result = query(
        `UPDATE pagamentos
         cliente_id, data_pagamento, valor, status
         SET cliente_id=${pagamento.cliente_id}, data_pagamento=${pagamento.data_pagamento}, valor=${pagamento.valor}, status='${pagamento.status}'
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

import { query } from "./db.js";

async function create(agendamento) {
    const result = query(
        `INSERT INTO agendamentos
         (cliente_id, aula_id, data)
         VALUES
         (${agendamento.cliente_id}, ${agendamento.aula_id}, ${agendamento.data})`
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
    const result = query(
        `UPDATE agendamentos
         SET cliente_id=${agendamento.cliente_id}, aula_id=${agendamento.aula_id}, data=${agendamento.data}
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

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
        `SELECT id, cliente_id, aula_id, data, presente
         FROM agendamentos`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, cliente_id, aula_id, data, presente
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

async function getByClienteId(clienteId) {
    const result = query(
        `SELECT a.id, a.cliente_id, a.aula_id, a.data, a.presente,
                au.nome as aula_nome, au.horario as aula_horario
         FROM agendamentos a
         LEFT JOIN aulas au ON a.aula_id = au.id
         WHERE a.cliente_id=${clienteId}
         ORDER BY a.data DESC`
    );

    return result;
}

async function markPresenca(id, presente) {
    const result = query(
        `UPDATE agendamentos 
         SET presente = ${presente ? 1 : 0}
         WHERE id = ${id}`
    );

    return { success: true, message: "Presença atualizada com sucesso", presente };
}

export default {
    create,
    getById,
    getAll,
    remove,
    update,
    getByClienteId,
    markPresenca
}

import { query } from "db";

async function create(treino) {
    const result = query(
        `INSERT INTO treinos
         (cliente_id, nome_treino, descricao, status)
         VALUES
         (${treino.cliente_id}, '${treino.nome_treino}', '${treino.descricao}', '${treino.status}')`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, cliente_id, nome_treino, descricao, status
         FROM treinos`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, cliente_id, nome_treino, descricao, status
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
    const result = query(
        `UPDATE treinos
         cliente_id, nome_treino, descricao, status
         SET cliente_id=${treino.cliente_id}, nome_treino='${treino.nome_treino}', descricao='${treino.descricao}', status='${treino.status}'
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

import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

// Criar novo treino
async function create(treino) {
    const { keys, values, params } = filterUndefinedAttrs(treino);

    const result = await query(
        `INSERT INTO treinos (${keys}) VALUES (${values})`,
        params
    );

    return { id: result.insertId, ...treino };
}

// Buscar todos os treinos
async function getAll() {
    const result = await query(
        `SELECT id, cliente_id, nome, descricao, dia_semana FROM treinos`
    );

    return result;
}

// Buscar treino por ID
async function getById(id) {
    const result = await query(
        `SELECT id, cliente_id, nome, descricao, dia_semana FROM treinos WHERE id = ?`,
        [id]
    );

    return result[0]; // retorna só um
}

// Deletar treino
async function remove(id) {
    const result = await query(
        `DELETE FROM treinos WHERE id = ?`,
        [id]
    );

    return { success: result.affectedRows > 0 };
}

// Atualizar treino
async function update(id, treino) {
    const { setStr, params } = makeSetStr(treino);
    const result = await query(
        `UPDATE treinos SET ${setStr} WHERE id = ?`,
        [...params, id]
    );

    return { success: result.affectedRows > 0 };
}

// Buscar treinos por ID do cliente
async function getByClienteId(clienteId) {
    const result = query(
        `SELECT id, cliente_id, nome, descricao, dia_semana
         FROM treinos
         WHERE cliente_id=${clienteId}`
    );

    return result;
}

export default {
    create,
    getAll,
    getById,
    remove,
    update,
    getByClienteId
};

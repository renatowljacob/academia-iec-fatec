import { query, filterUndefinedAttrs, makeSetStr } from "./db.js";

async function create(cliente) {
    const { keys, values } = filterUndefinedAttrs(cliente);

    const result = query(
        `INSERT INTO clientes
         (${keys})
         VALUES
         (${values})`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, nome, data_nascimento, cpf, email, endereco, telefone, status, plano
         FROM clientes`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, nome, data_nascimento, cpf, email, endereco, telefone, status, plano
         FROM clientes
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = query(
        `DELETE FROM clientes
         WHERE id=${id}`
    );

    return result;
}

async function update(id, cliente) {
    const result = query(
        `UPDATE clientes
         SET ${makeSetStr(cliente)}
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

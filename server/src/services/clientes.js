import { query } from "./db.js";

async function create(cliente) {
    const result = query(
        `INSERT INTO clientes
         (nome, email, senha, telefone, data_nascimento)
         VALUES
         ('${cliente.nome}', '${cliente.email}', '${cliente.senha}', '${cliente.telefone}', ${cliente.data_nascimento})`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, nome, email, telefone, data_nascimento
         FROM clientes`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, nome, email, telefone, data_nascimento
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
         SET nome='${cliente.nome}', email='${cliente.email}', senha='${cliente.senha}', telefone='${cliente.telefone}', data_nascimento=${cliente.data_nascimento}
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

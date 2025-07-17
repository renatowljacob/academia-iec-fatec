const db = require("db");

async function create(cliente) {
    const result = db.query(
        `INSERT INTO clientes
         (nome, email, senha, telefone, data_nascimento)
         VALUES
         ('${cliente.nome}', '${cliente.email}', '${cliente.senha}', '${cliente.telefone}', ${cliente.data_nascimento})`
    );

    return result;
}

async function getAll() {
    const result = db.query(
        `SELECT id, nome, email, telefone, data_nascimento
         FROM clientes`
    );

    return result;
}

async function getById(id) {
    const result = db.query(
        `SELECT id, nome, email, telefone, data_nascimento
         FROM clientes
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = db.query(
        `DELETE FROM clientes
         WHERE id=${id}`
    );

    return result;
}

async function update(id, cliente) {
    const result = db.query(
        `UPDATE clientes
         SET nome='${cliente.nome}', email='${cliente.email}', senha='${cliente.senha}', telefone='${cliente.telefone}', data_nascimento=${cliente.data_nascimento}
         WHERE id=${id}`
    );

    return result;
}

module.exports = {
    create,
    getById,
    getAll,
    remove,
    update
}

import { query } from './db.js';

async function create(admin) {
    const result = query(
        `INSERT INTO admins
         (nome, email, senha)
         VALUES
         ('${admin.nome}', '${admin.email}', '${admin.senha}')`
    );

    return result;
}

async function getAll() {
    const result = query(
        `SELECT id, nome, email
         FROM admins`
    );

    return result;
}

async function getById(id) {
    const result = query(
        `SELECT id, nome, email
         FROM admins
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = query(
        `DELETE FROM admins
         WHERE id=${id}`
    );

    return result;
}

async function update(id, admin) {
    const result = query(
        `UPDATE admins
         SET nome='${admin.nome}', email='${admin.email}', senha='${admin.senha}'
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

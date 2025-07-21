const db = require("db");

async function create(admin) {
    const result = db.query(
        `INSERT INTO admins
         (nome, email, senha)
         VALUES
         ('${admin.nome}', '${admin.email}', '${admin.senha}')`
    );

    return result;
}

async function getAll() {
    const result = db.query(
        `SELECT id, nome, email
         FROM admins`
    );

    return result;
}

async function getById(id) {
    const result = db.query(
        `SELECT id, nome, email
         FROM admins
         WHERE id=${id}`
    );

    return result;
}

async function remove(id) {
    const result = db.query(
        `DELETE FROM admins
         WHERE id=${id}`
    );

    return result;
}

async function update(id, admin) {
    const result = db.query(
        `UPDATE admins
         SET nome='${admin.nome}', email='${admin.email}', senha='${admin.senha}'
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

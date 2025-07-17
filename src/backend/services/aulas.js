const db = require("db");

async function create(aulas) {
    const results = db.query(
        `INSERT INTO aulas
         (nome, professor, horario)
         VALUES
         ('${aulas.nome}', '${aulas.professor}', ${aulas.horario})`
    );

    return results;
}

async function getById(id) {
    const results = db.query(
        `SELECT id, nome, professor, horario FROM aulas WHERE id=${id}`
    );

    return results;
}

async function getAll() {
    const results = db.query(
        `SELECT id, nome, professor, horario FROM aulas`
    );

    return results;
}

async function remove(id) {
    const results = db.query(
        `DELETE FROM aulas WHERE id=${id}`
    );

    return results;
}

async function update(id, aulas) {
    const results = db.query(
        `UPDATE aulas
         SET nome='${aulas.nome}', professor='${aulas.professor}', horario=${aulas.horario}
         WHERE id=${id}`
    );

    return results;
}

module.exports = {
    create,
    getById,
    getAll,
    remove,
    update
}

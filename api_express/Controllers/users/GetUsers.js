import { conexion } from '../../DataBase/DbConfig.js';

// TRAER TODOS LOS USUARIOS DEL SISTEMA
export function AllUsers(req, res) {

    const QuerySql = `SELECT * FROM users`;
    conexion.query(QuerySql, (error, results) => {
        error ? res.json({ message: error.message }) : res.json(results);
    });
}

// TRAER UN SOLO USUARIO DEL SISTEMA
export function FindUser(req, res) {

    const QuerySql = `SELECT * FROM users WHERE id_user = ?`;
    conexion.query(QuerySql, [req.params.id_user], (error, results) => {
        error ? res.json({ message: error.message }) : res.json(results);
    });
}

// CONTAR TODOS LOS USUARIOS DEL SISTEMA
export function CountUsers(req, res) {

    const QuerySql = `SELECT COUNT(*) AS amount FROM users;`;
    conexion.query(QuerySql, [req.params.id_user], (error, results) => {
        error ? res.json({ message: error.message }) : res.json(results);
    });
}
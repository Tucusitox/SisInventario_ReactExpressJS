import { conexion } from '../../DataBase/DbConfig.js';

// MOSTRAR TODOS LOS PROVEDORES DEL SISTEMA
export function AllCategories(req, res) {

    const QuerySql = `SELECT * FROM categories`;
  
    conexion.query(QuerySql, (error, results) => {
      error ? res.json({ message: error.message }) : res.json(results);
    });
};

// CONTAR TODAS LAS CATEGORIAS DEL SISTEMA
export function CountCategories(req, res) {

  const QuerySql = `SELECT COUNT(*) AS amount FROM categories;`;
  conexion.query(QuerySql, [req.params.id_user], (error, results) => {
      error ? res.json({ message: error.message }) : res.json(results);
  });
}
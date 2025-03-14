import { conexion } from "../../DataBase/DbConfig.js";

// MOSTRAR TODOS LOS PROVEDORES DEL SISTEMA
export function AllSuppliers(req, res) {
  const QuerySql = `SELECT * FROM suppliers`;

  conexion.query(QuerySql, (error, results) => {
    error ? res.json({ message: error.message }) : res.json(results);
  });
}

// BUSCAR UN PROVEDOR EN EL SISTEMA
export function FindSupplier(req, res) {
  const QuerySql = `SELECT * FROM suppliers WHERE id_supplier = ?`;

  conexion.query(QuerySql, [req.params.id_supplier], (error, results) => {
    error ? res.json({ message: error.message }) : res.json(results);
  });
}

// CONTAR TODOS LOS PROVEEDORES DEL SISTEMA
export function CountSuppliers(req, res) {
  const QuerySql = `SELECT COUNT(*) AS amount FROM suppliers;`;
  conexion.query(QuerySql, [req.params.id_user], (error, results) => {
    error ? res.json({ message: error.message }) : res.json(results);
  });
}

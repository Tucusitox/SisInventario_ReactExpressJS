import { conexion } from "../../DataBase/DbConfig.js";
import { validationResult } from "express-validator";

// TRAER TODOS LOS PRODUCTOS DEL SISTEMA
export function AllProducts(req, res) {
  const QuerySql = `SELECT * FROM products
    INNER JOIN categories ON categories.id_categorie = products.fk_categorie
    ORDER BY id_product DESC`;
  conexion.query(QuerySql, (error, results) => {
    error ? res.json({ message: error.message }) : res.json(results);
  });
}

// TRAER UN PRODUCTO DEL SISTEMA
export function FindProduct(req, res) {
  const QuerySql = `SELECT id_product, fk_supplier, fk_categorie, product_code, 
    product_img, categorie_name, supplier_name, product_name, product_price, product_stock 
    FROM products
    INNER JOIN categories ON categories.id_categorie = products.fk_categorie
    INNER JOIN products_x_suppliers pxs  ON pxs.fk_product = products.id_product
    INNER JOIN suppliers ON pxs.fk_supplier = suppliers.id_supplier 
    WHERE id_product = ?`;

  conexion.query(QuerySql, [req.params.id_product], (error, results) => {
    error ? res.json({ message: error.message }) : res.json(results);
  });
}

// BUSCAR UN PRODUCTO DEL SISTEMA POR SU CODIGO UNICO
export function FindCodeProduct(req, res) {
  // VALIDAMOS LA PETICION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const ArrayErros = errors.array().map((error) => ({ message: error.msg }));
    return res.status(400).json(ArrayErros);
  }

  const QuerySql = `SELECT id_product FROM products WHERE product_code = ?`;

  conexion.query(QuerySql, [req.body.product_code], (error, results) => {
    if (error) {
      res.json({ message: error.message });
    }
    if (results.length === 0) {
      return res
        .status(200)
        .json({ message: "Este producto no existe en el sistema" });
    }
    res.json(results);
  });
}

// CONTAR TODOS LOS PRODUCTOS DEL SISTEMA
export function CountProducts(req, res) {
  const QuerySql = `SELECT COUNT(*) AS amount FROM products;`;
  conexion.query(QuerySql, [req.params.id_user], (error, results) => {
    error ? res.json({ message: error.message }) : res.json(results);
  });
}

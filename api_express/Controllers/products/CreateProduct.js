import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';
import { ProcessFile } from './ProcessFile.js';
import { nanoid } from 'nanoid';

// CREAR UN PRODUCTO EN EL SISTEMA
export function CreateProduct(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // PROCESAMOS EL ARCHIVO
    const ImgProductRoute = ProcessFile(req.file);

    // SI NO HAY ERRO GUARDAMOS LOS DATOS EN UN ARRAY
    const NewProduct = [ 
        req.body.fk_supplier,
        req.body.fk_categorie,
        ImgProductRoute,
        nanoid(6,'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789').toUpperCase(), //->product_code,//
        req.body.product_name,
        req.body.product_price,
        req.body.product_stock,
    ];
    
    // DECLARAMOS LAS CONSULTAS SQL
    const QuerySql1 = `INSERT INTO products 
    (fk_categorie, product_img, product_code, product_name, product_price, product_stock)
    VALUES(?, ?, ?, ?, ?, ?)`;

    const QuerySql2 = `INSERT INTO products_x_suppliers (fk_product, fk_supplier)
    VALUES(?, ?)`;

    // INICIAR LA TRANSACCION SQL
    conexion.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: "Error al iniciar la transacción", error: err.message });
        }

        // EJECUTAR LA PRIMERA CONSULTA (INSERT EN "products")
        conexion.query(QuerySql1, NewProduct.slice(1), (error, results) => {
            if (error) {
                return conexion.rollback(() => {
                    res.status(500).json({ message: "Error al insertar producto", error: error.message });
                });
            }

            // EJECUTAR LA SEGUNDA CONSULTA (INSERT "products_x_suppliers")
            conexion.query(QuerySql2,[results.insertId, NewProduct[0]], (error) => {
                if (error) {
                    return conexion.rollback(() => {
                        res.status(500).json({ message: "Error al asociar producto con proveedor", error: error.message });
                    });
                }

                // SI TODO HA IDO BIEN HACER COMMIT DE LA TRANSACCION
                conexion.commit((err) => {
                    if (err) {
                        return conexion.rollback(() => {
                            res.status(500).json({ message: "Error al hacer commit de la transacción", error: err.message });
                        });
                    }

                    // DEVOLVER RESPUESTA DE EXITO
                    res.status(200).json([{ message: "Producto registrado con éxito" }]);
                });
            });
        });
    });
}
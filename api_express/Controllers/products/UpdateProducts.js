import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';
import { ProcessFile } from './ProcessFile.js';

// ACTUALIZAR UN PRODUCTO EN EL SISTEMA
export function UpdateProduct(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // PROCESAMOS EL ARCHIVO
    const ImgProductRoute = ProcessFile(req.file);

    // SI NO HAY ERRO GUARDAMOS LOS DATOS EN UN ARRAY
    const EditProduct = [
        req.body.fk_supplier,
        req.body.fk_categorie, 
        ImgProductRoute,
        req.body.product_name, 
        req.body.product_price, 
        req.body.product_stock,
        req.params.id_product, //->id_product
    ];

    // PREPARAMOS LAS CONSULTAS
    const QuerySql1 = `UPDATE products 
    SET fk_categorie = ?, product_img = ?, product_name = ?, product_price = ?, product_stock = ?
    WHERE id_product = ?`;

    const QuerySql2 = `UPDATE products_x_suppliers SET fk_supplier = ?
    WHERE fk_product = ?`;
    
    // EJECUTAMOS LA PRIMERA COSNULTA
    conexion.query(QuerySql1, EditProduct.slice(1), (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        }
        // SI TODO VA BIEN EJECUTAMOS LA SEGUNDA COSNULTA
        conexion.query(QuerySql2, [EditProduct[0], EditProduct[6]], (error) => {
            if(error){
                res.status(404).json([{ message: error.message }])
            }
            // DEVOLVEMOS RESPUESTA DE ESXITO
            res.status(200).json([{ message: "Producto actualizado con éxito" }]);
        });
    });
}
import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';

// ACTUALIZAR LA INFORMACION DE UN PROVEDOR EN EL SISTEMA
export function UpdateSupplier(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // CAPTURAMOS LOS DATOS
    const EditSupplier = [
        req.body.supplier_name,
        req.body.supplier_numberContact,
        req.params.id_supplier, //->id_supplier
    ]

    // GENERAMOS LA CONSULTA SQL
    const QuerySql = `UPDATE suppliers
    SET supplier_name = ?, supplier_numberContact = ?
    WHERE id_supplier = ?`;
  
    conexion.query(QuerySql, EditSupplier, (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        }
        res.status(200).json([{ message: "Proveedor actualizado con éxito" }]);
    });
}
import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';

// CREAR UN NUEVO PROVEDOR EN EL SISTEMA
export function CreateSupplier(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // CAPTURAMOS LOS DATOS
    const NewSupplier = [
        req.body.supplier_name,
        req.body.supplier_numberContact,
    ]

    // GENERAMOS LA CONSULTA SQL
    const QuerySql = `INSERT INTO suppliers (supplier_name, supplier_numberContact) 
    VALUES(?,?)`;
  
    conexion.query(QuerySql, NewSupplier, (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        }
        res.status(200).json([{ message: "Proveedor registrado con éxito" }]);
    });
}
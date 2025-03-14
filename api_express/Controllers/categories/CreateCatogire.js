import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';

// CREAR UNA NUEVA CATEGORIA EN EL SISTEMA
export function CreateCategorie(req, res) {
    
    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // GENERAMOS LA CONSULTA SQL
    const QuerySql = `INSERT INTO categories (categorie_name) VALUES(?)`;
  
    conexion.query(QuerySql, [req.body.categorie_name], (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        }
        res.status(200).json([{ message: "Categoria registrada con éxito" }]);
    });
}
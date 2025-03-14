import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';

// CREAR UNA NUEVA CATEGORIA EN EL SISTEMA
export function UpdateCategorie(req, res) {
    
    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // CAPTURAMOS LOS DATOS
    const EditCategorie = [
        req.body.categorie_name,
        req.params.id_categorie, //->id_categorie
    ]

    // GENERAMOS LA CONSULTA SQL
    const QuerySql = `UPDATE categories SET categorie_name = ? WHERE id_categorie = ?`;
  
    conexion.query(QuerySql, EditCategorie, (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        }
        res.status(200).json([{ message: "Categoria actualizada con éxito" }]);
    });
}
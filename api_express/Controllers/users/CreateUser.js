import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// CREAR UN NUEVO USUARIO EN EL SISTEMA
export async function CreateUser(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // CAPTURAMOS LOS DATOS
    const NewUser = [
        req.body.user_name, 
        req.body.user_email,
        await bcrypt.hash(req.body.user_password, 8), 
    ];

    // GENERAMOS LA CONSULTA SQL
    const QuerySql = `INSERT INTO users (user_name, user_email, user_password, user_status)
    VALUES(?, ?, ?, 'inactivo')`;
  
    conexion.query(QuerySql, NewUser, (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        }
        res.status(200).json([{ message: "Usuario creado con éxito" }]);
    });
}
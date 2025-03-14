import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// ACTUALIZAR LA CONTRASEÑA DE UN USUARIO EN EL SISTEMA
export async function UpdatePassword(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }

    // SI LAS CONTRASEÑAS NO COINCIDEN
    if (req.body.new_password !== req.body.confirm_password) {
        return res.status(404).json([{ message: "Las contraseñas no coinciden" }]) 
    }

    // CAPTURAMOS LOS DATOS
    const NewPassword = [
        req.params.id_user, //->id_user
        await bcrypt.hash(req.body.new_password, 8), 
    ];

    // GENERAMOS LA CONSULTA SQL
    const QuerySql = `UPDATE users SET user_password = ? WHERE id_user = ?`;
    conexion.query(QuerySql, [NewPassword[1],NewPassword[0]], (error) => {
        if(error){
            res.status(404).json([{ message: error.message }])
        } 
        res.status(200).json([{ message: "Contraseña actualizada con éxito" }]);
    });
}
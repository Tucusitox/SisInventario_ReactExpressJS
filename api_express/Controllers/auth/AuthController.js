import { conexion } from '../../DataBase/DbConfig.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// AUTENTICAR UN USUARIO EN EL SISTEMA
export async function AuthUser(req, res) {

    // VALIDAMOS LA PETICION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const ArrayErros =  errors.array().map((error) => ({ message: error.msg }));
        return res.status(400).json(ArrayErros);
    }


    // CAPTURAMOS LOS DATOS
    const { user_email, user_password } = req.body;

    // PREPARAMOS LAS CONSULTAS
    const QuerySql1 = `SELECT * FROM users WHERE user_email = ?`;
    const QuerySql2 = `UPDATE users SET user_status = ? WHERE user_email = ?`;

    // EJECUTAMOS LA CONSULTA N1
    conexion.query(QuerySql1, [user_email], async (error, results) => {
        if (error) {
            return res.status(500).json([{ message: error.message }]);
        }

        // CASO 1: EL USUARIO NO EXISTE EN SISTEMA
        if (results.length === 0) {
            return res.status(404).json([{ message: "Credenciales incorrectas" }]);
        }

        // CASO 2: EL USUARIO SE ENCUENTRA BLOQUEADO
        const EstatusUser = results[0].user_status;
        if (EstatusUser === 'bloqueado') {
            return res.status(404).json([{ message: "Este usuario esta bloqueado del sistema" }]);
        }

        // CASO 3: EL USUARIO SE ENCUENTRA BLOQUEADO
        if (EstatusUser === 'activo') {
            return res.status(404).json([{ message: "Este usuario tiene una sesión activa del sistema" }]);
        }

        // CAPTURAR CONTRASEÑA DE LA BD Y COMPARARLA CON LA ENVIADA
        const isMatch = await bcrypt.compare(user_password, results[0].user_password);

        // CASO 4: CREDENCIALES INVALIDAS
        if (!isMatch) {
            return res.status(401).json([{ message: "Credenciales incorrectas" }]);
        }

        // CASO IDEAL: CREDENCIALES VÁLIDAS
        // INICIAR SESION DE USUARIO EJECUTANDO LA CONSULTA N2
        const UserData = results[0];
        conexion.query(QuerySql2, ['activo', user_email], (error) => {
            if (error) {
                return res.status(500).json([{ message: error.message }]);
            }
            return res.status(200).json([{ UserAuth: UserData }]);
        });
    });
}

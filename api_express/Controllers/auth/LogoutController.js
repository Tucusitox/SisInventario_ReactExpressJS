import { conexion } from '../../DataBase/DbConfig.js';

// CERRAR LA SESION DE UN USUARIO EN EL SISTEMA
export function LogoutUser(req, res) {

    const QuerySql = `UPDATE users SET user_status = ? WHERE id_user = ?`;
    conexion.query(QuerySql, ['inactivo', req.params.id_user], async (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: "Sesión cerrada con éxito" });
    });
}

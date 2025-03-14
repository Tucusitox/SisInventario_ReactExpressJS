import { conexion } from '../../DataBase/DbConfig.js';

// BLOQUEAR A UN USUARIO EN EL SISTEMA
export function BlockUser(req, res) {

    const QuerySql = `UPDATE users SET user_status = ? WHERE id_user = ?`;
    conexion.query(QuerySql, ['bloqueado', req.params.id_user], async (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json([{ message: "Usuario bloqueado con éxito" }]);
    });
}

// DESBLOQUEAR A UN USUARIO EN EL SISTEMA
export function DesBlockUser(req, res) {

    const QuerySql = `UPDATE users SET user_status = ? WHERE id_user = ?`;
    conexion.query(QuerySql, ['inactivo', req.params.id_user], async (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json([{ message: "Usuario desbloqueado con éxito" }]);
    });
}
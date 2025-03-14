import { conexion } from '../../DataBase/DbConfig.js';

// ELIMINAR A UN USUARIO DEL SISTEMA
export function DelteUser(req, res) {

    const QuerySql = `DELETE FROM users WHERE id_user = ?`;

    conexion.query(QuerySql, [req.params.id_user], (error) => {
        if(error){
            res.status(404).json({ message: error.message })
        }
        res.status(200).json([{ message: "Usuario eliminado con éxito" }]);
    });
}
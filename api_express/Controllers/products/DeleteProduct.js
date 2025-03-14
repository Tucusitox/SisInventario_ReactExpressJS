import { conexion } from '../../DataBase/DbConfig.js';

// ELIMINAR UN PRODUCTO DEL SISTEMA
export function DeleteProduct(req, res) {

    const ProductId = req.params.id_product;
    const QuerySql1 = `DELETE FROM products_x_suppliers WHERE fk_product = ?`;
    const QuerySql2 = `DELETE FROM products WHERE id_product = ?`;

    // INICIAR TRANSACCION
    conexion.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: "Error al iniciar la transacción", error: err.message });
        }

        // ELIMINAR RELACION EN TABLA "products_x_suppliers"
        conexion.query(QuerySql1, [ProductId], (error) => {
            if (error) {
                return conexion.rollback(() => {
                    res.status(500).json({ message: "Error al eliminar la relación con el proveedor", error: error.message });
                });
            }

            // SI TODO VA BIEN ELIMINAR REGISTRO EN "products"
            conexion.query(QuerySql2, [ProductId], (error) => {
                if (error) {
                    return conexion.rollback(() => {
                        res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
                    });
                }

                // SI TODO HA IDO BIEN HACER COMMIT DE LA TRANSACCION
                conexion.commit((err) => {
                    if (err) {
                        return conexion.rollback(() => {
                            res.status(500).json({ message: "Error al hacer commit de la transacción", error: err.message });
                        });
                    }

                    // DEVOLVER RESPUESTA DE EXITO
                    res.status(200).json([{ message: "Producto eliminado con éxito" }]);
                });
            });
        });
    });
}

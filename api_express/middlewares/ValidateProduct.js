import { body } from 'express-validator';

// VALIDAR LA CREACION DE UN PRODUCTO 
export const ValidateNewProduct = [
    body("fk_supplier").notEmpty().isInt({ min: 1 }).withMessage("Por favor, seleccione un proveedor"),
    body("fk_categorie").notEmpty().isInt({ min: 1 }).withMessage("Por favor, seleccione una categoría"),
    body("product_img").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Por favor, seleccione una imagen");
        }
        if (!req.file.mimetype.startsWith("image/")) {
            throw new Error("El archivo debe ser una imagen");
        }
        return true;
    }),
    body("product_name").notEmpty().withMessage("Por favor, indique el nombre del producto"),
    body("product_price").notEmpty().isFloat({ min: 1 }).withMessage("Por favor, indique el precio del producto"),
    body("product_stock").notEmpty().isInt({ min: 1 }).withMessage("Por favor, indique la cantidad del producto"),
];

// VALIDAR LA ACTUALIZACION DE UN PRODUCTO 
export const ValidateEditProduct = [
    body("fk_supplier").notEmpty().isInt({ min: 1 }).withMessage("Por favor, seleccione un proveedor"),
    body("fk_categorie").notEmpty().isInt({ min: 1 }).withMessage("Por favor, seleccione una categoría"),
    body("editProduct_img").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Por favor, seleccione una nueva imagen");
        }
        if (!req.file.mimetype.startsWith("image/")) {
            throw new Error("El archivo debe ser una imagen");
        }
        return true;
    }),
    body("product_name").notEmpty().withMessage("Por favor, indique el nombre del producto"),
    body("product_price").notEmpty().isFloat({ min: 1 }).withMessage("Por favor, indique el precio del producto"),
    body("product_stock").notEmpty().isInt({ min: 1 }).withMessage("Por favor, indique la cantidad del producto"),
];

// VALIDAR BUSQUEDA POR CODIGO UNICO DE UN PRODUCTO 
export const ValidateCodeProduct = [
    body("product_code").matches(/^[A-Z0-9]{6}$/).withMessage("El código no cumnple con el formato esperado"),
];
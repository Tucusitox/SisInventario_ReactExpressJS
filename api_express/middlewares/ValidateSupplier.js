import { body } from 'express-validator';

// VALIDAR LA CREACION DE UN PROVEEDOR
export const ValidateNewSupplier = [
    body("supplier_name").isLength({ min: 5 }).withMessage("El nombre del proveedor debe tener al menos 5 caracteres"),
    body("supplier_numberContact").matches(/^\d{11}$/).withMessage("El número de contacto no cumple con el formato esperado"),
];

// VALIDAR LA ACTUALIZACION DE UN PROVEEDOR
export const ValidateEditSupplier = [
    body("supplier_name").isLength({ min: 5 }).withMessage("El nombre del proveedor debe tener al menos 5 caracteres"),
    body("supplier_numberContact").matches(/^\d{11}$/).withMessage("El número de contacto no cumple con el formato esperado"),
];

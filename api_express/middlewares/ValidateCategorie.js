import { body } from 'express-validator';

// VALIDAR LA CREACION DE UNA CATEGORIA
export const ValidateNewCategorie = [
    body("categorie_name").isLength({ min: 5 }).withMessage("El nombre de la categoría debe tener al menos 5 caracteres"),
];

// VALIDAR LA ACTUALIZACION DE UNA CATEGORIA
export const ValidateEditCategorie = [
    body("categorie_name").isLength({ min: 5 }).withMessage("El nombre de la categoría debe tener al menos 5 caracteres"),
];

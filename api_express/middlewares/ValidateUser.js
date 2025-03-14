import { body } from 'express-validator';

// VALIDAR LA CREACION DE UN USUARIO
export const ValidateNewUser = [
    body("user_name").isLength({ min: 5 }).withMessage("El nombre de usuario debe tener al menos 5 caracteres"),
    body("user_email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/).withMessage("El correo no cumnple con el formato esperado"),
    body("user_password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

// VALIDAR LA ACTUALIZACION DE CONTRASEÑA DE UN USUARIO
export const ValidateChangePasswordUser = [
    body("new_password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("confirm_password").isLength({ min: 8 }).withMessage("La confirmación contraseña debe tener al menos 8 caracteres"),
];

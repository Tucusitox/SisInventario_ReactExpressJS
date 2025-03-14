import { body } from 'express-validator';

// VALIDAR LA AUTENTICACION DE UN USUARIO
export const ValidateLoginUser = [
    body("user_email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/).withMessage("El correo no cumple con el formato esperado"),
    body("user_password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];
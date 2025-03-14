import express from 'express';
import { AllProducts, CountProducts, FindCodeProduct, FindProduct } from '../Controllers/products/GetProducts.js';
import { CreateProduct } from '../Controllers/products/CreateProduct.js';
import { UpdateProduct } from '../Controllers/products/UpdateProducts.js';
import { DeleteProduct } from '../Controllers/products/DeleteProduct.js';
import { CreateUser } from '../Controllers/users/CreateUser.js';
import { AllUsers, CountUsers, FindUser } from '../Controllers/users/GetUsers.js';
import { AuthUser } from '../Controllers/auth/AuthController.js';
import { LogoutUser } from '../Controllers/auth/LogoutController.js';
import { BlockUser, DesBlockUser } from '../Controllers/auth/BlockAndDesBlockUser.js';
import { UpdatePassword } from '../Controllers/users/ChangePasswordUser.js';
import { DelteUser } from '../Controllers/users/DeleteUser.js';
import { CreateCategorie } from '../Controllers/categories/CreateCatogire.js';
import { CreateSupplier } from '../Controllers/suppliers/CreateSupplier.js';
import { UpdateSupplier } from '../Controllers/suppliers/UpdateSupplier.js';
import { AllSuppliers, CountSuppliers, FindSupplier } from '../Controllers/suppliers/GetSuppliers.js';
import { ValidateCodeProduct, ValidateEditProduct, ValidateNewProduct } from '../middlewares/ValidateProduct.js';
import { ValidateChangePasswordUser, ValidateNewUser } from '../middlewares/ValidateUser.js';
import { ValidateEditSupplier, ValidateNewSupplier } from '../middlewares/ValidateSupplier.js';
import { ValidateEditCategorie, ValidateNewCategorie } from '../middlewares/ValidateCategorie.js';
import { UpdateCategorie } from '../Controllers/categories/UpdateCategorie.js';
import { ValidateLoginUser } from '../middlewares/auth/ValidateLogin.js';
import { AllCategories, CountCategories } from '../Controllers/categories/GetCategories.js';
import multer from 'multer';

const ImgProduct = multer({ dest: 'public/imgProducts'}); //->CAPTURAR IMG DEL PRODUCTO

export const AppRoutes = express.Router()
// -------------------------------------------------
// EL ENDPOINT GENERAL ES: http://localhost:8000/api
// -------------------------------------------------

// RUTAS PARA AUTENTICAR A USUARIOS DEL SISTEMA
AppRoutes.post('/AuthUser', ValidateLoginUser, AuthUser);
AppRoutes.put('/LogoutUser/:id_user', LogoutUser);
AppRoutes.put('/BlockUser/:id_user', BlockUser);
AppRoutes.put('/DesBlockUser/:id_user', DesBlockUser);

// RUTAS PARA CRUD Y CAMBIO DE CONTRASEÑA DE USUARIOS DEL SISTEMA
AppRoutes.get('/AllUsers', AllUsers);
AppRoutes.get('/CountUsers', CountUsers);
AppRoutes.get('/FindUser/:id_user', FindUser);
AppRoutes.post('/CreateUser', ValidateNewUser, CreateUser);
AppRoutes.put('/UpdatePasswordUser/:id_user', ValidateChangePasswordUser, UpdatePassword);
AppRoutes.delete('/DeleteUser/:id_user', DelteUser);

// RUTAS PARA CRUD DE LOS PRODUCTOS DEL SISTEMA
AppRoutes.get('/AllProducts', AllProducts);
AppRoutes.get('/CountProducts', CountProducts);
AppRoutes.get('/FindProduct/:id_product', FindProduct);
AppRoutes.post('/FindCodeProduct', ValidateCodeProduct, FindCodeProduct);
AppRoutes.post('/CreateProduct', ImgProduct.single('product_img'), ValidateNewProduct, CreateProduct);
AppRoutes.put('/UpdateProduct/:id_product',ImgProduct.single('editProduct_img'), ValidateEditProduct, UpdateProduct);
AppRoutes.delete('/DeleteProduct/:id_product', DeleteProduct);

// RUTAS PARA CRUD CATEGORIAS
AppRoutes.get('/AllCategories', AllCategories);
AppRoutes.get('/CountCategories', CountCategories);
AppRoutes.post('/CreateCategorie', ValidateNewCategorie, CreateCategorie);
AppRoutes.put('/UpdateCategorie/:id_categorie', ValidateEditCategorie, UpdateCategorie);

// RUTAS PARA CRUD PROVEEDORES
AppRoutes.get('/AllSuppliers', AllSuppliers);
AppRoutes.get('/CountSuppliers', CountSuppliers);
AppRoutes.get('/FindSupplier/:id_supplier', FindSupplier);
AppRoutes.post('/CreateSupplier', ValidateNewSupplier,CreateSupplier);
AppRoutes.put('/UpdateSupplier/:id_supplier', ValidateEditSupplier,UpdateSupplier);
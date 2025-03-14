import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";

// IVOCANDO COMPONENTES
import { FormAuthUser } from "./components/auth/Login";
import { Dashboard } from "./pages/Dasshboard";

// RENDERIZANDO LOS COMPONENTES
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormAuthUser />} />
        <Route path='/Dashboard/:id_user' element={ <Dashboard view='IndexDashboard'/> } />
        {/* RUTAS DE USAURIOS */}
        <Route path='/ManagmentUsers/:id_user' element={ <Dashboard view='ManagmentUsers'/> } />
        <Route path='/NewUser/:id_user' element={ <Dashboard view='NewUser'/> } />
        <Route path='/ChangePassword/:id_user' element={ <Dashboard view='NewPassword'/> } />
        {/* RUTAS DE PRODUCTOS */}
        <Route path='/AllProducts/:id_user' element={ <Dashboard view='AllProducts'/> } />
        <Route path='/NewProduct/:id_user' element={ <Dashboard view='NewProduct'/> } />
        <Route path='/DetailsProduct/:id_user/:id_producto' element={ <Dashboard view='DetailProduct'/> } />
        <Route path='/EditProduct/:id_user/:id_producto' element={ <Dashboard view='EditProduct'/> } />
        {/* RUTAS DE CATEGORIAS */}
        <Route path='/ManagmentCategories/:id_user' element={ <Dashboard view='ManagmentCategories'/> } />
        <Route path='/NewCategorie/:id_user' element={ <Dashboard view='NewCategorie'/> } />
        {/* RUTAS DE PROVEEDORES */}
        <Route path='/ManagmentSuppliers/:id_user' element={ <Dashboard view='ManagmentSuppliers'/> } />
        <Route path='/NewSupplier/:id_user' element={ <Dashboard view='NewSupplier'/> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

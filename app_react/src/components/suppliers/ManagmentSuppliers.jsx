import { AlertFilter, AlertMessage } from '../AlertMessage';
import { EditSupplier } from './EditSupplier';
import { useEffect, useState } from "react";
import axios from 'axios';

export function ManagmentSuppliers() {

    const EndPoint = 'http://localhost:8000/api/AllSuppliers';
    
    const [AllSuppliers, setAllSuppliers] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [success, setSuccess] = useState(false);
    const [SearchSupplier, setSearchSupplier] = useState("");
  
    // METODO PARA CARGAR TODOS LOS USUARIOS
    async function GetAllSuppliers() {
      const responde = await axios.get(EndPoint);
      setAllSuppliers(responde.data);
    };
  
    useEffect(() => {
        GetAllSuppliers();
    }, []);
  
    // MÉTODO PARA BUSCAR USUARIO POR ID
    const SuppliersData = !SearchSupplier 
    ? AllSuppliers 
    : AllSuppliers.filter((item) => String(item.supplier_name.toLowerCase()).includes(SearchSupplier.toLowerCase()));

    // METODO QUE SE EJECUTARA TRAS ACTUALIZAR UNA CATEGORIA
    const handleDeleteSuccess = (message) => {
        setMessageSuccess(message);
        setSuccess(true);
        GetAllSuppliers();
    };

  return (
    <>
      <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
        <div className="w-50 text-primary">
          <h3>Lista de todos los proveedores</h3>
        </div>

        <div className="w-50 text-end input-group input-group-sm" style={{ width: "220px", height: "20px" }}>
          <input type="text" className="form-control border-2 border-primary" placeholder="Buscar por nombre del proveedor"
            value={SearchSupplier} onChange={(e)=>setSearchSupplier(e.target.value)}/>
          <div className="btn btn-primary">
            <i className="bx bx-search"></i>
          </div>
        </div>
      </div>
      {/* MENSAJE DE EXITO */}
      {success && <AlertMessage message={messageSuccess} typeAlert='alert-success' fnRefresh={() => setSuccess(false)}/>}

      <div className="card-body table-responsive p-0" style={{ height: "300px" }}>
        {SuppliersData.length === 0 && <AlertFilter message={'No se encontro a ningún proveedor con este nombre'} typeAlert='alert-danger'/>}
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>Id del proveedor</th>
              <th>Nombre del proveedor</th>
              <th>Medio de contacto del proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {SuppliersData.map((item) => (
              <tr key={item.id_supplier}>
                <td>{item.id_supplier}</td>
                <td>{item.supplier_name}</td>
                <td>{item.supplier_numberContact}</td>
                <td>
                    <EditSupplier EditSupplierId={item.id_supplier} 
                        NameEditSupplier={item.supplier_name}
                        NumberContactEditSupplier={item.supplier_numberContact}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
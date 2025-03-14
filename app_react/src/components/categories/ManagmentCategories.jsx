import { AlertFilter, AlertMessage } from '../AlertMessage';
import { EditCategorie } from './EditCategorie';
import { useEffect, useState } from "react";
import axios from 'axios';

export function ManagmentCategories() {

    const EndPoint = 'http://localhost:8000/api/AllCategories';
    
    const [AllCategories, setAllCategories] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [success, setSuccess] = useState(false);
    const [SearchCategorie, setSearchCategorie] = useState("");
  
    // METODO PARA CARGAR TODOS LOS USUARIOS
    async function GetAllCategories() {
      const responde = await axios.get(EndPoint);
      setAllCategories(responde.data);
    };
  
    useEffect(() => {
        GetAllCategories();
    }, []);
  
    // MÉTODO PARA BUSCAR USUARIO POR ID
    const CategoriesData = !SearchCategorie 
    ? AllCategories 
    : AllCategories.filter((item) => String(item.categorie_name.toLowerCase()).includes(SearchCategorie.toLowerCase()));

    // METODO QUE SE EJECUTARA TRAS ACTUALIZAR UNA CATEGORIA
    const handleDeleteSuccess = (message) => {
        setMessageSuccess(message);
        setSuccess(true);
        GetAllCategories();
    };

  return (
    <>
      <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
        <div className="w-50 text-primary">
          <h3>Lista de todas las catgorías</h3>
        </div>

        <div className="w-50 text-end input-group input-group-sm" style={{ width: "220px", height: "20px" }}>
          <input type="text" className="form-control border-2 border-primary" placeholder="Buscar por nombre de la categoría"
            value={SearchCategorie} onChange={(e)=>setSearchCategorie(e.target.value)}/>
          <div className="btn btn-primary">
            <i className="bx bx-search"></i>
          </div>
        </div>
      </div>
      {/* MENSAJE DE EXITO */}
      {success && <AlertMessage message={messageSuccess} typeAlert='alert-success' fnRefresh={() => setSuccess(false)}/>}

      <div className="card-body table-responsive p-0" style={{ height: "300px" }}>
        {CategoriesData.length === 0 && <AlertFilter message={'No se encontro a ninguna categoría con este nombre'} typeAlert='alert-danger'/>}
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>Id de la categoría</th>
              <th>Nombre de la categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {CategoriesData.map((item) => (
              <tr key={item.id_categorie}>
                <td>{item.id_categorie}</td>
                <td>{item.categorie_name}</td>
                <td>
                    <EditCategorie EditCategorieId={item.id_categorie} NameEditCategorie={item.categorie_name}
                    onDeleteSuccess={handleDeleteSuccess}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

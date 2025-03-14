import { AlertFilter, AlertMessage } from '../AlertMessage';
import { useEffect, useState } from 'react';
import { DeleteUser } from './DeleteUser';
import axios from 'axios';

export function ManagmentUsers({ AuthUserID }) {
  const EndPoint1 = 'http://localhost:8000/api/AllUsers';
  const EndPoint2 = 'http://localhost:8000/api/BlockUser/';
  const EndPoint3 = 'http://localhost:8000/api/DesBlockUser/';
  
  const [AllUsers, setAllUsers] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);
  const [SearchUser, setSearchUser] = useState("");

  // METODO PARA CARGAR TODOS LOS USUARIOS
  async function GetAllUsers() {
    const responde = await axios.get(EndPoint1);
    setAllUsers(responde.data);
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  // MÉTODO PARA BUSCAR USUARIO POR ID
  const UsersData = !SearchUser 
  ? AllUsers 
  : AllUsers.filter((item) => String(item.user_name.toLowerCase()).includes(SearchUser.toLowerCase()));

  // METODO PARA BLOQUAR O DESBLOQUEAR USUARIOS
  async function BlockAndDesblockUsers(IdUser, isBlock) {
    // EVALUAMOS SI ES BLOQUEO O DESBLOQUEO
    const url = isBlock ? EndPoint2+IdUser : EndPoint3+IdUser;

    // EJECUTAMOS LA PETICION AL SERVIDOR
    const response = await axios.put(url);
    if (response.status === 200) {
      setMessageSuccess(response.data[0].message);
      setSuccess(true);
      GetAllUsers();
    }
  };

  // METODO QUE SE EJECUTARA TRAS ELIMINAR UN USUARIO
  const handleDeleteSuccess = (message) => {
    setMessageSuccess(message);
    setSuccess(true);
    GetAllUsers();
  };
  
  return (
    <>
      <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
        <div className="w-50 text-primary">
          <h3>Lista de todos los usuarios</h3>
        </div>

        <div className="w-50 text-end input-group input-group-sm" style={{ width: "220px", height: "20px" }}>
          <input type="text" className="form-control border-2 border-primary" placeholder="Buscar por nombre usuario"
            value={SearchUser} onChange={(e)=>setSearchUser(e.target.value)}/>
          <div className="btn btn-primary">
            <i className="bx bx-search"></i>
          </div>
        </div>
      </div>
      {/* MENSAJE DE EXITO */}
      {success && <AlertMessage message={messageSuccess} typeAlert='alert-success' fnRefresh={() => setSuccess(false)}/>}

      <div className="card-body table-responsive p-0" style={{ height: "300px" }}>
        {UsersData.length === 0 && <AlertFilter message={'No se encontro a ningún usuario con este nombre'} typeAlert='alert-danger'/>}
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {UsersData.map((item) => (
              <tr key={item.id_user}>
                <td>{item.id_user}</td>
                <td>{item.user_name}</td>
                <td>{item.user_email}</td>
                <td>{item.user_status}</td>
                <td>
                  {/* Si el usuario autenticado es el mismo que el usuario listado, no muestra botones */}
                  {item.id_user === AuthUserID ? ( <p>Sin acciones</p>) : (
                    <>
                      {item.user_status === "bloqueado" ? (
                        <button type="button" onClick={() => BlockAndDesblockUsers(item.id_user, false)}
                          className="btn btn-outline-warning me-2" title="Desbloquear">
                          <i className="bx bxs-check-circle"></i>
                        </button>
                      ) : (
                        <button type="button" onClick={() => BlockAndDesblockUsers(item.id_user, true)}
                          className="btn btn-warning me-2" title="Bloquear">
                          <i className="bx bx-block"></i>
                        </button>
                      )}
                      <DeleteUser IdUser={item.id_user} onDeleteSuccess={handleDeleteSuccess} />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { AlertValidate } from "../AlertValidate";
import { AlertMessage } from "../AlertMessage";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function NewUser({ AuthUserID }) {

  const EndPoint = 'http://localhost:8000/api/CreateUser';
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('12345678');
  const [ValidateErrors, setValidateErrors] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);
  
  async function SaveUser(e) {
    e.preventDefault();

    try {
        const response = await axios.post(EndPoint, {
            user_name: UserName,
            user_email: Email,
            user_password: Password,
        });

        if (response.status === 200) {
            setMessageSuccess(response.data[0].message);
            setSuccess(true);
            setUserName('');
            setEmail('');
        }
    }
    catch (error) {
        setValidateErrors(error.response.data);
        setShowErrorModal(true);
    }
    
  }
  return (
    <>
      <form onSubmit={SaveUser}>
        <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
          <div className="w-50 text-start text-primary">
            <h3>Registrar un nuevo usuario</h3>
          </div>
          <div className="w-50 text-end">
            <Link className="btn btn-danger me-2" to={`/ManagmentUsers/${AuthUserID}`}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-outline-success">
              Registrar
            </button>
          </div>
        </div>

        {/* MENSAJE DE EXITO */}
        {success && (
            <AlertMessage message={messageSuccess} typeAlert=" alert-success" fnRefresh={( ) => setSuccess(false)}/>
        )}
        <div className="card-body p-0">
            <div className="form-floating mb-4">
                <input type="text" className="form-control border-2 border-primary" placeholder="name@example.com"
                    value={UserName} onChange={(e) => setUserName(e.target.value)} />
                <label htmlFor="floatingInput" className="text-primary">Nombre de usuario</label>
            </div>
            <div className="form-floating mb-4">
                <input type="email" className="form-control border-2 border-primary" placeholder="name@example.com"
                    value={Email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="floatingInput" className="text-primary">Correo electrónico</label>
            </div>
            <div className="form-floating mb-4">
                <input type="email" className="form-control border-2 border-primary" placeholder="name@example.com"
                    value={Password} onChange={(e) => setPassword(e.target.value)} disabled/>
                <label htmlFor="floatingInput" className="text-primary">Contraseña</label>
            </div>
        </div>
      </form>
      {/* VER LOS ERRORES DE VALIDACION */}
      {showErrorModal && (
        <AlertValidate AlertErros={ValidateErrors} onClose={() => setShowErrorModal(false)} />
      )}
    </>
  );
}

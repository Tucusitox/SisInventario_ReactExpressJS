import { AlertValidate } from "../AlertValidate";
import { AlertMessage } from "../AlertMessage";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function NewCategorie({ AuthUserID }) {

  const EndPoint = 'http://localhost:8000/api/CreateCategorie';
  const [CategorieName, setCategorieName] = useState('');
  const [ValidateErrors, setValidateErrors] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);
  
  async function SaveCategorie(e) {
    e.preventDefault();

    try {
        const response = await axios.post(EndPoint, {
            categorie_name: CategorieName,
        });

        if (response.status === 200) {
            setMessageSuccess(response.data[0].message);
            setSuccess(true);
            setCategorieName('');
        }
    }
    catch (error) {
        setValidateErrors(error.response.data);
        setShowErrorModal(true);
    }
    
  }
  return (
    <>
      <form onSubmit={SaveCategorie}>
        <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
          <div className="w-50 text-start text-primary">
            <h3>Registrar una nueva categoría</h3>
          </div>
          <div className="w-50 text-end">
            <Link className="btn btn-danger me-2" to={`/ManagmentCategories/${AuthUserID}`}>
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
                    value={CategorieName} onChange={(e) => setCategorieName(e.target.value)} />
                <label htmlFor="floatingInput" className="text-primary">Nombre de la categoría</label>
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
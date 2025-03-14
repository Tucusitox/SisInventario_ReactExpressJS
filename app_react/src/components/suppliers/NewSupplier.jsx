import { AlertValidate } from "../AlertValidate";
import { AlertMessage } from "../AlertMessage";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function NewSupplier({ AuthUserID }) {

  const EndPoint = 'http://localhost:8000/api/CreateSupplier';
  const [SupplierName, setSupplierName] = useState('');
  const [NumberContact, setNumberContact] = useState('');
  const [ValidateErrors, setValidateErrors] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);
  
  async function SaveSupplier(e) {
    e.preventDefault();

    try {
        const response = await axios.post(EndPoint, {
            supplier_name:SupplierName,
            supplier_numberContact:NumberContact,
        });

        if (response.status === 200) {
            setMessageSuccess(response.data[0].message);
            setSuccess(true);
            setSupplierName('');
            setNumberContact('');
        }
    }
    catch (error) {
        setValidateErrors(error.response.data);
        setShowErrorModal(true);
    }
    
  }
  return (
    <>
      <form onSubmit={SaveSupplier}>
        <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
          <div className="w-50 text-start text-primary">
            <h3>Registrar un nuevo proveedor</h3>
          </div>
          <div className="w-50 text-end">
            <Link className="btn btn-danger me-2" to={`/ManagmentSuppliers/${AuthUserID}`}>
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
                    value={SupplierName} onChange={(e) => setSupplierName(e.target.value)} />
                <label htmlFor="floatingInput" className="text-primary">Nombre del proveedor</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control border-2 border-primary" placeholder="name@example.com"
                    value={NumberContact} onChange={(e) => setNumberContact(e.target.value)} />
                <label htmlFor="floatingInput" className="text-primary">Número de contacto del proovedor</label>
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
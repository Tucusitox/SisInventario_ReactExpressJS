import { AlertValidate } from "../AlertValidate";
import { useState } from "react";
import axios from "axios";

export function EditSupplier({ EditSupplierId, NameEditSupplier, NumberContactEditSupplier, onDeleteSuccess }) {

    const EndPoint = `http://localhost:8000/api/UpdateSupplier/${EditSupplierId}`;

    const [SupplierName, setSupplierName] = useState(NameEditSupplier);
    const [NumberContact, setNumberContact] = useState(NumberContactEditSupplier);
    const [ValidateErrors, setValidateErrors] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    // METODO PARA CAPTURAR LA CATEGORIA A EDITAR
    async function UpdateSupplier(e) {
        e.preventDefault();

        try {
            const response = await axios.put(EndPoint, {
                supplier_name:SupplierName,
                supplier_numberContact:NumberContact,
            });
    
            if (response.status === 200) {
                onDeleteSuccess(response.data[0].message);
            }
        }
        catch (error) {
            setValidateErrors(error.response.data);
            setShowErrorModal(true);
        }
        
    }

  return (
    <>
        <button type="button"  data-bs-toggle="modal" data-bs-target={`#EditModal-${EditSupplierId}`}
            className="btn btn-info me-2" title="Editar">
            <i class='bx bxs-edit'></i>
        </button>

      <div class="modal fade" id={`EditModal-${EditSupplierId}`} aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered text-primary">
          <form onSubmit={UpdateSupplier}
            class="modal-content border-3 border-primary">

            <div class="modal-header border-3 border-bottom border-primary">
              <h4>Actualice el proveedor: N{EditSupplierId}</h4>
            </div>

            <div class="modal-body">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control border-2 border-primary" placeholder="name@example.com"
                        value={SupplierName} onChange={(e) => setSupplierName(e.target.value)} />
                    <label htmlFor="floatingInput" className="text-primary">Nombre del proveedor</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control border-2 border-primary" placeholder="name@example.com"
                        value={NumberContact} onChange={(e) => setNumberContact(e.target.value)} />
                    <label htmlFor="floatingInput" className="text-primary">Número de contacto</label>
                </div>
            </div>

            <div class="modal-footer border-3 border-top border-primary">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-outline-success" data-bs-dismiss="modal">
                Guardar
              </button>
            </div>

          </form>
        </div>
      </div>
        {/* VER LOS ERRORES DE VALIDACION */}
        {showErrorModal && (
            <AlertValidate AlertErros={ValidateErrors} onClose={() => setShowErrorModal(false)} />
        )}
    </>
  );
}
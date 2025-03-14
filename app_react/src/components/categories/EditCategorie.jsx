import { AlertValidate } from "../AlertValidate";
import { useState } from "react";
import axios from "axios";

export function EditCategorie({ EditCategorieId, NameEditCategorie, onDeleteSuccess }) {

    const EndPoint = `http://localhost:8000/api/UpdateCategorie/${EditCategorieId}`;

    const [CategorieName, setCategorieName] = useState(NameEditCategorie);
    const [ValidateErrors, setValidateErrors] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    // METODO PARA CAPTURAR LA CATEGORIA A EDITAR
    async function UpdateCategorie(e) {
        e.preventDefault();

        try {
            const response = await axios.put(EndPoint, {
                categorie_name:CategorieName
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
        <button type="button"  data-bs-toggle="modal" data-bs-target={`#EditModal-${EditCategorieId}`}
            className="btn btn-info me-2" title="Editar">
            <i class='bx bxs-edit'></i>
        </button>

      <div class="modal fade" id={`EditModal-${EditCategorieId}`} aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered text-primary">
          <form onSubmit={UpdateCategorie}
            class="modal-content border-3 border-primary">

            <div class="modal-header border-3 border-bottom border-primary">
              <h4>Actualice la categía: N{EditCategorieId}</h4>
            </div>

            <div class="modal-body">
                <div className="form-floating">
                    <input type="text" className="form-control border-2 border-primary" placeholder="name@example.com"
                        value={CategorieName} onChange={(e) => setCategorieName(e.target.value)} />
                    <label htmlFor="floatingInput" className="text-primary">Nombre de la categoría</label>
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

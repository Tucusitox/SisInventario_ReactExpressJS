import { useNavigate } from "react-router-dom";
import { AlertValidate } from "../AlertValidate";
import { useState } from "react";
import axios from "axios";

export function FindCodeProdcut({ AuthUserID }) {
  const navigate = useNavigate();
  const EndPoint = "http://localhost:8000/api/FindCodeProduct";
  const [ProductCode, setProductCode] = useState("");
  const [ValidateErrors, setValidateErrors] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  async function SearchCode(e) {
    e.preventDefault();

    try {
      const response = await axios.post(EndPoint, {
        product_code: ProductCode,
      });

      if (response.status === 200) {
        navigate(`/DetailsProduct/${AuthUserID}/${response.data[0].id_product}`);
      }
    } catch (error) {
      setValidateErrors(error.response.data);
      setShowErrorModal(true);
    }
  }
  return (
    <>
      <div className="w-50 text-end input-group input-group-sm" style={{ width: "220px", height: "20px" }}>
        <form className="input-group" onSubmit={SearchCode}>
          <input
            type="text"
            className="form-control border-2 border-primary"
            placeholder="Buscar por código"
            value={ProductCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bx bx-search"></i>
          </button>
        </form>
      </div>
      {/* VER LOS ERRORES DE VALIDACION */}
      {showErrorModal && (
        <AlertValidate
          AlertErros={ValidateErrors}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
}

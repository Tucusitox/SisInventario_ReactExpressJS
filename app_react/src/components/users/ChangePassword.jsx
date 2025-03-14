import { AlertValidate } from "../AlertValidate";
import { AlertMessage } from "../AlertMessage";
import { useState } from "react";
import axios from "axios";

export function ChangePassword({ AuthUserID }) {

  const EndPoint = `http://localhost:8000/api/UpdatePasswordUser/${AuthUserID}`;
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ValidateErrors, setValidateErrors] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);

  const UpdatePassword = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.put(EndPoint, {
            new_password: NewPassword,
            confirm_password: ConfirmPassword,
        });

        if (response.status === 200) {
          setMessageSuccess(response.data[0].message);
          setSuccess(true);
          setNewPassword("");
          setConfirmPassword("");
        }
    }
    catch (error) {
        setValidateErrors(error.response.data);
        setShowErrorModal(true);
    }
};

  // FUNCION PARA MOSTRAR LA CONTRASEÑA
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="card-header border-2 border-bottom border-primary mb-3" >
        <h2 className="text-primary text-center">Actualice su contraseña</h2>
      </div>

      {/* MENSAJE DE EXITO */}
      {success && <AlertMessage message={messageSuccess} typeAlert='alert-success' fnRefresh={() => setSuccess(false)}/>}

      <form onSubmit={UpdatePassword}>
        
        <div className="form-floating mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control border-2 border-primary"
            placeholder="Password"
            value={NewPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword" className="text-primary">
            Nueva contraseña
          </label>

          <i onClick={togglePasswordVisibility}
            className={`bx ${showPassword ? "bx-show" : "bx-low-vision"} text-primary fs-4`}>
          </i>
        </div>

        <div className="form-floating mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control border-2 border-primary"
            placeholder="Password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword" className="text-primary">
            Confirmar contraseña
          </label>

          <i onClick={togglePasswordVisibility}
            className={`bx ${showPassword ? "bx-show" : "bx-low-vision"} text-primary fs-4`}>
          </i>
        </div>

        <button type="submit" className="btn btn-primary w-100">Guardar</button>
      </form>

      {/* VER LOS ERRORES DE VALIDACION */}
      {showErrorModal && (
          <AlertValidate AlertErros={ValidateErrors} onClose={() => setShowErrorModal(false)} />
      )}
      
    </>
  );
}

import { useEffect, useState } from "react";
import { LayoutLogin } from "../../layouts/LayoutLogin";
import { AlertValidate } from "../AlertValidate";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export function FormAuthUser() {

    const EndPoint = 'http://localhost:8000/api/AuthUser';
    const [UserAuth, setUserAuth] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [AuthErrors, setAuthErrors] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (UserAuth) {

            localStorage.setItem('SessionUser', UserAuth.id_user); //->MANEJAR LA SESION
            navigate(`/dashboard/${UserAuth.id_user}`);
        }
    }, [UserAuth]);

    const AuthUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(EndPoint, {
                user_email: Email,
                user_password: Password,
            });

            if (response.status === 200) {
                setUserAuth(response.data[0].UserAuth);
                setShowErrorModal(false);
            }
        }
        catch (error) {
            setAuthErrors(error.response.data);
            setShowErrorModal(true);
        }
    };

    // FUNCION PARA MOSTRAR LA CONTRASEÑA
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <LayoutLogin>
                <form onSubmit={AuthUser}>
                    <h1 className="text-primary text-center mb-4">Inicia sesión</h1>
                    <div className="form-floating mb-4">
                        <input type="email" className="form-control border-2 border-primary" placeholder="name@example.com"
                            value={Email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floatingInput" className="text-primary">Correo electrónico</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control border-2 border-primary" 
                            placeholder="Password"
                            value={Password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            id="clave-login"
                        />
                        <label htmlFor="floatingPassword" className="text-primary">Contraseña</label>
                        <i onClick={togglePasswordVisibility} id="loginClave-Icono" 
                            className={`bx ${showPassword ? 'bx-show' : 'bx-low-vision'} text-primary fs-4`}
                        ></i>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>

                {/* VER LOS ERRORES DE VALIDACION */}
                {showErrorModal && (
                    <AlertValidate AlertErros={AuthErrors} onClose={() => setShowErrorModal(false)} />
                )}

            </LayoutLogin>
        </>
    );
}


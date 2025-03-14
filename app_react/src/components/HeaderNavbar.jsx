import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export function Navbar({ UserName, UserID }) {

  const navigate = useNavigate();

  // METODO PARA GENERAR LOGOUT DEL USAURIO
  async function LogoutUser(e) {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/LogoutUser/${UserID}`);
    localStorage.removeItem('SessionUser')
    navigate('/');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-trasnparent py-2 border-2 border-bottom border-primary">
        <div className="container-fluid px-5">
          <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasWithBothOptions" aria-controls="staticBackdrop">
              <i className='bx bx-menu'></i>
          </button>

          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Bienvenido {UserName}
            </button>

            <div className="dropdown-menu dropdown-menu-en border-2 border-primary">
                <Link to={`/Dashboard/${UserID}`}  className='dropdown-item text-primary'>
                <i className="bx bxs-dashboard me-2"></i>
                    Dashboard
                </Link>
                <Link to={`/ChangePassword/${UserID}`}  className='dropdown-item text-primary'>
                  <i className='bx bxs-cog me-2'></i>
                    Cambiar contraseña
                </Link>
                <form className="d-flex dropdown-item" onSubmit={LogoutUser}>
                    <button className='nav-link text-primary' type='submit'>
                      <i className='bx bxs-left-arrow-circle me-2'></i>
                      Cerrar sesión
                    </button>
                </form>
            </div>

          </div>

        </div>
      </nav>
    </>
  );
}



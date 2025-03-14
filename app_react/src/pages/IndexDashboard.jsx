import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function IndexDashboard({ AuthUserID }) {
  // ENPOINTS
  const EndPoint1 = 'http://localhost:8000/api/CountUsers';
  const EndPoint2 = 'http://localhost:8000/api/CountProducts';
  const EndPoint3 = 'http://localhost:8000/api/CountCategories';
  const EndPoint4 = 'http://localhost:8000/api/CountSuppliers';
  
  // VARIABLES
  const [Users, setUsers] = useState('');
  const [Products, setProducts] = useState('');
  const [Categories, setCategories] = useState('');
  const [Suppliers, setSuppliers] = useState('');

  // METODO PARA SOLICITAR LAS CUENTAS DE LAS TABLAS
  async function GetCounts() {
    const respUsers = await axios.get(EndPoint1);
    const respProducts = await axios.get(EndPoint2);
    const respCategorie = await axios.get(EndPoint3);
    const respSupplier = await axios.get(EndPoint4);

    setUsers(respUsers.data);
    setProducts(respProducts.data);
    setCategories(respCategorie.data);
    setSuppliers(respSupplier.data);
  }

  useEffect(()=>{
    GetCounts();
  },[]);

  const CardsItems = [
    {
      tittle:`Usuarios:\n${Users.length > 0 ? Users[0].amount : 'Cargando...'}`,
      subTittle:"Ir a usuarios",
      icon:"bx bxs-user-detail",
      path:`/ManagmentUsers/${AuthUserID}`,
      imgPath:"/gestionUsuarios.jpg",
    },
    {
      tittle:`Productos:\n${Products.length > 0 ? Products[0].amount : 'Cargando...'}`,
      subTittle:"Ir a productos",
      icon:"bx bxl-product-hunt",
      path:`/AllProducts/${AuthUserID}`,
      imgPath:"/gestionProductos.webp",
    },
    {
      tittle:`Categorías:\n${Categories.length > 0 ? Categories[0].amount : 'Cargando...'}`,
      subTittle:"Ir a categorías",
      icon:"bx bxs-category",
      path:`/ManagmentCategories/${AuthUserID}`,
      imgPath:"/gestionCategorias.jpg",
    },
    {
      tittle:`Proveedores:\n${Suppliers.length > 0 ? Suppliers[0].amount : 'Cargando...'}`,
      subTittle:"Ir a proveedores",
      icon:"bx bxs-contact",
      path:`/ManagmentSuppliers/${AuthUserID}`,
      imgPath:"/gestionProveedores.avif",
    }
  ];

  return (
    <>
      <div className="row justify-content-center">

        {CardsItems.map((item) => (
          <div className="col-12 col-md-6 d-flex mb-3" style={{ width: "600px" }}>
            <div className="card flex-fill border-2 border-primary MiniCards">
                <div className="card-body p-0 d-flex flex-fill">
                    <div className="row g-0 w-100">
                        <div className="col-6">
                            <div className="p-3 m-1 text-primary">
                                <h4 className="fs-3">
                                  <i className={`${item.icon} me-2`}></i>
                                  {item.tittle} 
                                </h4>
                                <Link to={item.path}
                                  className="btn btn-outline-primary my-3 fs-5">
                                  {item.subTittle}
                                </Link>
                            </div>   
                        </div>
                        <div className="col-6 align-self-end text-end">
                            <img src={item.imgPath} className="img-fluid"
                              style={{ width: "100%;", height:"200px"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

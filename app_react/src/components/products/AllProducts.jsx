import { FindCodeProdcut } from "./FindCodeProduct";
import { DeleteProduct } from "./DeleteProduct";
import { AlertMessage } from "../AlertMessage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function AllProducts({ AuthUserID }) {
  const EndPoint = "http://localhost:8000/api/AllProducts";
  const [AllProducts, setAllProducts] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);

  // METOOD PARA LSITAR TODOS LOS PRODUCTOS
  async function GetProducts() {
    const response = await axios.get(EndPoint);
    setAllProducts(response.data);
  }

  useEffect(() => {
    GetProducts();
  }, []);

  // METODO QUE SE EJECUTARA TRAS ELIMINAR UN PRODUCTO
  const handleDeleteSuccess = (message) => {
    setMessageSuccess(message);
    setSuccess(true);
    GetProducts();
  };

  return (
    <>
      <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
        <div className="w-50 text-primary">
          <h3>Lista de todos los productos</h3>
        </div>
        <FindCodeProdcut AuthUserID={AuthUserID}/>
      </div>
      {/* MENSAJE DE EXITO */}
      {success && <AlertMessage message={messageSuccess} typeAlert='alert-success' fnRefresh={() => setSuccess(false)}/>}

      <div className="card-body table-responsive p-0" style={{ height: "300px" }}>
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>Código</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {AllProducts.map((item) => (
              <tr key={item.id_product}>
                <td>{item.product_code}</td>
                <td>
                  <img
                    src={`http://localhost:8000/${item.product_img}`}
                    style={{ width: "70px", height: "auto" }}
                    className="rounded"
                  />
                </td>
                <td>{item.product_name}</td>
                <td>{item.product_price}$</td>
                <td>{item.product_stock} unidades</td>
                <td>
                  <Link
                    to={`/DetailsProduct/${AuthUserID}/${item.id_product}`}
                    className="btn btn-warning me-2"
                    title="Detalles"
                  >
                    <i className="bx bx-detail"></i>
                  </Link>
                  <Link
                    to={`/EditProduct/${AuthUserID}/${item.id_product}`}
                    className="btn btn-info me-2"
                    title="Editar"
                  >
                    <i className="bx bxs-edit"></i>
                  </Link>
                  <DeleteProduct IdProduct={item.id_product} onDeleteSuccess={handleDeleteSuccess} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

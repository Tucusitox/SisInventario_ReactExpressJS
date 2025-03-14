import { AlertValidate } from "../AlertValidate";
import { AlertMessage } from "../AlertMessage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function NewProduct({ AuthUserID }) {
  // VARIABLES A USAR INCIALES
  const EndPoint1 = "http://localhost:8000/api/AllSuppliers";
  const EndPoint2 = "http://localhost:8000/api/AllCategories";
  const EndPoint3 = "http://localhost:8000/api/CreateProduct";

  const [Suppliers, setSuppliers] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [ValidateErrors, setValidateErrors] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);

  // VARIBALES CAPTURADAS EN EL FORMUALRIO
  const [ProductSupplier, setProductSupplier] = useState('');
  const [ProductCategorie, setProductCategorie] = useState('');
  const [ProductImg, setProductImg] = useState('');
  const [ProductName, setProductName] = useState('');
  const [ProductPrice, setProductPrice] = useState('');
  const [ProductStock, setProductStock] = useState('');

  // METODO PARA TRAER TODOS LOS PROVEEDORES Y CATEGORIAS
  async function GetSuppliersAndCategories(url1, url2) {
    const SuppResponse = await axios.get(url1);
    const CategResponse = await axios.get(url2);
    setSuppliers(SuppResponse.data);
    setCategories(CategResponse.data);
  }

  useEffect(()=>{
    GetSuppliersAndCategories(EndPoint1, EndPoint2);
  },[]);

  async function SaveProduct(e) {
    e.preventDefault();

    try {
        const response = await axios.post(EndPoint3, {
            fk_supplier: ProductSupplier,
            fk_categorie: ProductCategorie,
            product_img: ProductImg,
            product_name: ProductName,
            product_price: ProductPrice,
            product_stock: ProductStock,
        },{
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          setMessageSuccess(response.data[0].message);
          setSuccess(true);
          setProductSupplier('');
          setProductCategorie('');
          setProductImg('');
          setProductName('');
          setProductPrice('');
          setProductStock('');
        }
    }
    catch (error) {
      setValidateErrors(error.response.data);
      setShowErrorModal(true);
    }
  }

  return (
    <>
      <form onSubmit={SaveProduct}>
        <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
          <div className="w-50 text-start text-primary">
            <h3>Registrar un nuevo producto</h3>
          </div>
          <div className="w-50 text-end">
            <Link className="btn btn-danger me-2" to={`/AllProducts/${AuthUserID}`}>Cancelar</Link>
            <button type="submit" className="btn btn-outline-success">Registrar</button>
          </div>
        </div>
        
        {/* MENSAJE DE EXITO */}
        {success && <AlertMessage message={messageSuccess} typeAlert='alert-success' fnRefresh={() => setSuccess(false)}/>}

        <div className="d-flex card-body p-0">
          {/* PARTE 1 PARA CREAR PRODUCTO */}
          <div className="w-50 me-2">

            <select className="form-select border-2 border-primary py-3 mb-3 text-primary"
              value={ProductSupplier} onChange={(e)=>setProductSupplier(e.target.value)}>
              <option value={0}>Proveedor del producto</option>
              {Suppliers.map((item) =>(
                <option key={item.id_supplier} value={item.id_supplier}>
                  {item.supplier_name}
                </option>
              ))}
            </select>

            <select className="form-select border-2 border-primary py-3 mb-3 text-primary"
              value={ProductCategorie} onChange={(e)=>setProductCategorie(e.target.value)}>
              <option value={0}>Categoría del producto</option>
              {Categories.map((item) =>(
                <option key={item.id_categorie} value={item.id_categorie}>
                  {item.categorie_name}
                </option>
              ))}
            </select>
            
            <input className="form-control border border-2 border-primary rounded" style={{ padding: "12px 10px" }}
              type="file" id="formFile" onChange={(e)=>setProductImg(e.target.files[0])}
            />

          </div>
          {/* FIN PARTE 1 PARA CREAR PRODUCTO */}
          {/* ----------------------------------- */}
          {/* INICIO PARTE 2 PARA CREAR PRODUCTO */}
          <div className="w-50">

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-2 border-primary"
                placeholder="name@example.com"
                value={ProductName}
                onChange={(e)=>setProductName(e.target.value)}
              />
              <label htmlFor="floatingInput" className="text-primary">
                Nombre del producto
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                step="any"
                min={1}
                className="form-control border-2 border-primary"
                placeholder="name@example.com"
                value={ProductPrice}
                onChange={(e)=>setProductPrice(e.target.value)}
              />
              <label htmlFor="floatingInput" className="text-primary">
                Precio del producto
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                min={1}
                className="form-control border-2 border-primary"
                placeholder="name@example.com"
                value={ProductStock}
                onChange={(e)=>setProductStock(e.target.value)}
              />
              <label htmlFor="floatingInput" className="text-primary">
                Cantidad del producto
              </label>
            </div>

          </div>
          {/* FIN PARTE 2 PARA CREAR PRODUCTO */}
        </div>

      </form>

      {/* VER LOS ERRORES DE VALIDACION */}
      {showErrorModal && (
          <AlertValidate AlertErros={ValidateErrors} onClose={() => setShowErrorModal(false)} />
      )}
    </>
  );
}

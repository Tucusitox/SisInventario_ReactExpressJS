import { AlertValidate } from "../AlertValidate";
import { AlertMessage } from "../AlertMessage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function EditProduct({ AuthUserID, IdProduct }) {
  const EndPoint1 = "http://localhost:8000/api/AllSuppliers";
  const EndPoint2 = "http://localhost:8000/api/AllCategories";
  const EndPoint3 = `http://localhost:8000/api/FindProduct/${IdProduct}`;
  const EndPoint4 = `http://localhost:8000/api/UpdateProduct/${IdProduct}`;

  const [productDetail, setProductDetail] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [validateErrors, setValidateErrors] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [success, setSuccess] = useState(false);

  // Variables de formulario
  const [productData, setProductData] = useState({
    fk_supplier: "",
    fk_categorie: "",
    editProduct_img: "",
    product_name: "",
    product_price: "",
    product_stock: "",
  });

  async function fetchInitialData() {
    try {
      const [suppResponse, categResponse, productResponse] = await Promise.all([
        axios.get(EndPoint1),
        axios.get(EndPoint2),
        axios.get(EndPoint3),
      ]);
      setSuppliers(suppResponse.data);
      setCategories(categResponse.data);
      setProductDetail(productResponse.data);

      if (productResponse.data.length > 0) {
        setProductData({
          fk_supplier: productResponse.data[0].fk_supplier || "",
          fk_categorie: productResponse.data[0].fk_categorie || "",
          editProduct_img: "",
          product_name: productResponse.data[0].product_name || "",
          product_price: productResponse.data[0].product_price || "",
          product_stock: productResponse.data[0].product_stock || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function UpdateProduct(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      const response = await axios.put(EndPoint4, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setMessageSuccess(response.data[0].message);
        setSuccess(true);
      }
    } catch (error) {
      setValidateErrors(error.response?.data || "Error desconocido");
      setShowErrorModal(true);
    }
  }

  return (
    <>
      <form onSubmit={UpdateProduct}>
        <div className="d-flex card-header border-2 border-bottom border-primary mb-3">
          <div className="w-50 text-start text-primary">
            <h3>
              Actualizar el producto:
              <span>{productDetail?.[0]?.product_code || "Cargando..."}</span>
            </h3>
          </div>
          <div className="w-50 text-end">
            <Link className="btn btn-danger me-2" to={`/AllProducts/${AuthUserID}`}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-outline-success">
              Guardar
            </button>
          </div>
        </div>

        {success && (
          <AlertMessage
            message={messageSuccess}
            typeAlert="alert-success"
            fnRefresh={() => setSuccess(false)}
          />
        )}

        <div className="d-flex card-body p-0">
          <div className="w-50 me-2">
            <select
              className="form-select border-2 border-primary py-3 mb-3 text-primary"
              value={productData.fk_supplier}
              onChange={(e) =>
                setProductData({ ...productData, fk_supplier: e.target.value })
              }
            >
              <option value="">Proveedor del producto</option>
              {suppliers.map((item) => (
                <option key={item.id_supplier} value={item.id_supplier}>
                  {item.supplier_name}
                </option>
              ))}
            </select>

            <select
              className="form-select border-2 border-primary py-3 mb-3 text-primary"
              value={productData.fk_categorie}
              onChange={(e) =>
                setProductData({ ...productData, fk_categorie: e.target.value })
              }
            >
              <option value="">Categoría del producto</option>
              {categories.map((item) => (
                <option key={item.id_categorie} value={item.id_categorie}>
                  {item.categorie_name}
                </option>
              ))}
            </select>

            <input 
              className="form-control border border-2 border-primary rounded"
              style={{ padding: "12px 10px" }}
              type="file" 
              id="formFile" 
              onChange={(e) => {
                const file = e.target.files[0];
                setProductData(prevData => ({ ...prevData, editProduct_img: file }));
              }} 
            />
          </div>
          <div className="w-50">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-2 border-primary"
                value={productData.product_name}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    product_name: e.target.value,
                  })
                }
              />
              <label className="text-primary">Nombre del producto</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                step="any"
                min={1}
                className="form-control border-2 border-primary"
                value={productData.product_price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    product_price: e.target.value,
                  })
                }
              />
              <label className="text-primary">Precio del producto</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                min={1}
                className="form-control border-2 border-primary"
                value={productData.product_stock}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    product_stock: e.target.value,
                  })
                }
              />
              <label className="text-primary">Cantidad del producto</label>
            </div>
          </div>
        </div>
      </form>

      {showErrorModal && (
        <AlertValidate
          AlertErros={validateErrors}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
}

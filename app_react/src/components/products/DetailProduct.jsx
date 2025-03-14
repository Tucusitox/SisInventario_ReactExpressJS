import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function DetailsProdcut({ AuthUserID, IdProduct }) {
    const EndPoint = `http://localhost:8000/api/FindProduct/${IdProduct}`;
    const [PorductDetail, setPorductDetail] = useState([]);

    useEffect(()=>{
        async function FindProduct(url) {
            const response = await axios.get(url);
            setPorductDetail(response.data);
        } 
    
        FindProduct(EndPoint);       
    },[]);

    return(
        <>
            <div className="d-flex card-header border-2 border-primary">
                <div className="w-50 text-primary">
                    <h3>Producto: 
                        <span>
                            {PorductDetail.length > 0 ? PorductDetail[0].product_code : 'Cargando...'}
                        </span>
                    </h3>
                </div>
                <div className="w-50 text-end">
                  <Link to={`/AllProducts/${AuthUserID}`}
                    className="btn btn-warning me-2" title="Editar">
                    <i class='bx bx-left-arrow-circle me-1'></i>
                    Todos los productos
                  </Link>
                </div>
            </div>

            <div className="row justify-content-center card-body">
                <div className="col-lg-4 text-center">
                    <img src={`http://localhost:8000/${PorductDetail.length > 0 ? PorductDetail[0].product_img : 'Cargando...'}`}
                    style={{ width: "300px", height: "300px", borderRadius: "10px" }}/>
                </div>
                <div className="col-lg-8 text-start my-4">
                    <h3>Catgoría: 
                        <span>
                            {PorductDetail.length > 0 ? PorductDetail[0].categorie_name : 'Cargando...'}
                        </span>
                    </h3>
                    <h3>Proveedor:
                        <span>
                            {PorductDetail.length > 0 ? PorductDetail[0].supplier_name : 'Cargando...'}
                        </span>
                    </h3>
                    <h3>Nombre del producto:
                        <span>
                            {PorductDetail.length > 0 ? PorductDetail[0].product_name : 'Cargando...'}
                        </span>
                    </h3>
                    <h3>Precio del producto:
                        <span>
                            {PorductDetail.length > 0 ? PorductDetail[0].product_price : 'Cargando...'}$
                        </span>
                    </h3>
                    <h3>Cantidad del producto:
                        <span>
                            {PorductDetail.length > 0 ? PorductDetail[0].product_stock : 'Cargando...'}
                            -unidades
                        </span>
                    </h3>
                </div>
            </div>
        </>
    );
}
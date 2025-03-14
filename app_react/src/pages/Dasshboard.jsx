import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LayoutDashboard } from "../layouts/LayoutDashboard";
import { AllProducts } from "../components/products/AllProducts";
import { ModalCarga } from "../components/ModalCarga";
import { ChangePassword } from "../components/users/ChangePassword";
import { IndexDashboard } from "./IndexDashboard";
import { NewProduct } from "../components/products/NewProduct";
import { DetailsProdcut } from "../components/products/DetailProduct";
import { EditProduct } from "../components/products/EditProduct";
import { ManagmentUsers } from "../components/users/ManagmentUsers";
import { NewUser } from "../components/users/NewUser";
import { ManagmentCategories } from "../components/categories/ManagmentCategories";
import { NewCategorie } from "../components/categories/NewCategorie";
import { ManagmentSuppliers } from "../components/suppliers/ManagmentSuppliers";
import { NewSupplier } from "../components/suppliers/NewSupplier";
import { LayoutIndexDashboard } from "../layouts/LayoutIndexDashboard";
import axios from "axios";

export function Dashboard({ view }) {

    const { id_user, id_producto } = useParams();
    const [UserData, setUserData] = useState(null);
    const EndPoint = `http://localhost:8000/api/FindUser/${id_user}`;

    useEffect(() => {

        async function FindUser(url) {
            const response = await axios.get(url);
            setUserData(response.data);
        }

        FindUser(EndPoint);

    }, [id_user]);

    // MENSAJE MIENTRAS CARGA EL COMPONENTE
    if (!UserData) {
        return (
            <ModalCarga/>
        );
    }

    // RETORNAR COMPONENTE
    return (
        <>
            {view === "IndexDashboard" ? (
                <LayoutIndexDashboard name={UserData[0].user_name} id={UserData[0].id_user}>
                    {view === "IndexDashboard" && <IndexDashboard AuthUserID={UserData[0].id_user}/> }
                </LayoutIndexDashboard>
            ) : (
                <LayoutDashboard name={UserData[0].user_name} id={UserData[0].id_user}>
                    {/* USERS */}
                    {view === "ManagmentUsers" && <ManagmentUsers AuthUserID={UserData[0].id_user} />}
                    {view === "NewUser" && <NewUser AuthUserID={UserData[0].id_user} />}
                    {view === "NewPassword" && <ChangePassword AuthUserID={UserData[0].id_user}/>}
                    {/* PRODUCTS */}
                    {view === "AllProducts" && <AllProducts AuthUserID={UserData[0].id_user}/> }
                    {view === "NewProduct" && <NewProduct AuthUserID={UserData[0].id_user}/> }
                    {view === "DetailProduct" && <DetailsProdcut AuthUserID={UserData[0].id_user} IdProduct={id_producto}/> }
                    {view === "EditProduct" && <EditProduct AuthUserID={UserData[0].id_user} IdProduct={id_producto}/> }
                    {/* CATEGORIES */}
                    {view === "ManagmentCategories" && <ManagmentCategories />}
                    {view === "NewCategorie" && <NewCategorie AuthUserID={UserData[0].id_user} />}
                    {/* SUPPLIERS */}
                    {view === "ManagmentSuppliers" && <ManagmentSuppliers />}
                    {view === "NewSupplier" && <NewSupplier AuthUserID={UserData[0].id_user} />}
                </LayoutDashboard>
            )}
        </>
    );
}


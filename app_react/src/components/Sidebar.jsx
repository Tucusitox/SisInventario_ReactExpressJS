import { useState } from "react";
import { Link } from "react-router-dom";

export function Sidebar({UserID}) {
    const [openSections, setOpenSections] = useState({});

    const toggleDropdown = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const menuItems = [
        {
            title: "Usuarios",
            icon: "bx bxs-user-detail",
            subItems: [
                { label: "Gestión de usuarios", link: `/ManagmentUsers/${UserID}` }, 
                { label: "Registrar nuevo usuario", link: `/NewUser/${UserID}` }
            ]
        },
        {
            title: "Productos",
            icon: "bxl-product-hunt",
            subItems: [
                { label: "Todos los productos", link: `/AllProducts/${UserID}` },
                { label: "Registrar nuevo producto", link: `/NewProduct/${UserID}` }
            ]
        },
        {
            title: "Categorías",
            icon: "bxs-category",
            subItems: [
                { label: "Todas las categorías", link: `/ManagmentCategories/${UserID}`},
                { label: "Registrar nueva categoría", link: `/NewCategorie/${UserID}` }
            ]
        },
        {
            title: "Proveedores",
            icon: "bxs-contact",
            subItems: [
                { label: "Todos los proveedores", link: `/ManagmentSuppliers/${UserID}` },
                { label: "Registrar nuevo proveedor", link: `/NewSupplier/${UserID}` }
            ]
        }
    ];

    return (
        <aside className="offcanvas offcanvas-start border-2 border-end border-primary" 
            id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">

            <div className="offcanvas-header justify-content-between align-items-center border-2 border-bottom border-primary">
                <h5 className="d-flex offcanvas-title text-primary" id="staticBackdropLabel">
                    <i className="bx bxs-dashboard me-2 fs-2"></i>
                    <p className="mt-1">Gestión de inventarios</p>
                </h5>
                <button type="button" className="btn btn-primary" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i className="bx bx-x"></i>
                </button>
            </div>

            <div className="offcanvas-body fs-4">
                {menuItems.map((item, index) => (
                    <div key={index} className="bg-transparent border border-2 border-primary rounded w-100 mb-2"
                        style={{ border: openSections[item.title] ? "2px solid blue" : "none", borderRadius: openSections[item.title] ? "10px" : "0" }}>
                        <div className="SidebarLink d-flex justify-content-between align-items-center text-primary p-2">
                            <a href="#" className="nav-link d-flex align-items-center" onClick={() => toggleDropdown(item.title)}>
                                <i className={`bx ${item.icon} me-2`}></i>
                                <h5 className="mt-2">{item.title}</h5>
                            </a>
                            <i className={`bx ${openSections[item.title] ? "bxs-up-arrow" : "bxs-down-arrow"}`} 
                                style={{ cursor: 'pointer' }} onClick={() => toggleDropdown(item.title)}></i>
                        </div>

                        {openSections[item.title] && (
                            <nav className="nav-links text-primary px-2 mb-2">
                                {item.subItems.map((subItem, subIndex) => (
                                    <Link to={subItem.link} key={subIndex} className="d-flex SidebarLink nav-link"> 
                                        <i className='bx bx-circle me-2 mb-3'></i>
                                        <h5>{subItem.label}</h5>
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}

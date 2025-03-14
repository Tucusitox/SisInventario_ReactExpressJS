import Swal from "sweetalert2";
import axios from "axios";

export function DeleteProduct({ IdProduct, onDeleteSuccess }) {
    const alertaDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-outline-success",
                cancelButton: "btn btn-danger me-2",
                popup: "border border-2 border-primary",
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "¿Estás Seguro?",
            text: "¡Esta acción eliminará el producto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, Estoy Seguro",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            background: 'white',
        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await axios.delete(`http://localhost:8000/api/DeleteProduct/${IdProduct}`);

                if (response.status === 200) {
                    onDeleteSuccess(response.data[0].message);
                }
            }
        });
    };

    return (
        <button className="btn btn-danger" title="Eliminar" onClick={alertaDelete}>
            <i className="bx bx-trash"></i>
        </button>
    );
}

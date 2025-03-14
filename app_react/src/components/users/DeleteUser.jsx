import Swal from "sweetalert2";
import axios from "axios";

export function DeleteUser({ IdUser, onDeleteSuccess }) {
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
            text: "¡Esta acción eliminará al usuario del sistema!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, Estoy Seguro",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            background: 'white',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:8000/api/DeleteUser/${IdUser}`);

                    if (response.status === 200) {
                        onDeleteSuccess(response.data[0].message);
                    }
                } catch (error) {
                    console.error("Error al eliminar el usuario:", error);
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

import Swal from "sweetalert2";

export function AlertValidate({ AlertErros, onClose }) { 

    const ErrorsMessages = AlertErros.map(item => `¡${item.message}!`).join("<br>");

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger",
            popup: "text-danger border border-2 border-danger",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
        html: ErrorsMessages,
        icon: "error",
        confirmButtonText: "Entendido",
        reverseButtons: true,
        background: "white",
    }).then((result) => {
        if (result.isConfirmed) {
            onClose();
        }
    });
}
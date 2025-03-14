import React from 'react';

export function ModalCarga() {
    return (
        <>
            <div className="modal fade show" style={{ display: 'block', paddingRight: '15px', backdropFilter: 'blur(0.4rem)' }} 
                aria-modal="true" role="dialog">
                    
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-white rounded border-2 border-primary text-center p-5">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status"></div>
                        </div>
                        <div className="text-primary mt-3">
                            <h4><b>¡Cargando dashboard!</b></h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

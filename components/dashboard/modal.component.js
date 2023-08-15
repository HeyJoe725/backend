import React from 'react';
import '../../styles/modal.css'
// Assuming you'll put the styles in a separate CSS file

function Modal({ show, onClose, children }) {
    if (!show) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <button className="modal-close-btn" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
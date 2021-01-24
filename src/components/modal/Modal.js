import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';

import './modal.css';

const modalRoot = document.querySelector("body");

const Modal = ({isOpen, closeCb, children, title}) => {
    useEffect(() => {
       if(isOpen) document.body.style.position = 'fixed';
       else document.body.position = '';
    }, [isOpen]);
    const closeModal = () => {
        document.body.style.position = '';
        closeCb();
    }
    return (
        isOpen &&
        createPortal(
            // child element
            <div className="modal-container">
                <div className="bio-modal">
                    <div className="bio-modal-header">
                        <h4>{title}</h4>
                    </div>
                    <div className="bio-modal-body">
                        {children}
                    </div>
                    <div className="bio-modal-footer">
                        <button onClick={closeModal} className="btn btn-danger">Close</button>
                    </div>
                </div>
            </div>,
            // target container
            modalRoot
        )
    );
};

export default Modal;
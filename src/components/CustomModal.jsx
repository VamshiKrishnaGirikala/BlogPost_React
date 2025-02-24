import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, body, footer }) => {
    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="customModalLabel">
            <Modal.Header closeButton>
                <Modal.Title id="customModalLabel">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                {footer ? (
                    footer
                ) : (
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
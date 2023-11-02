import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    value: string;
    blockTitle: string,
    propertyToEdit: string,
    identifier: string,
    onSave: (blockTitle: string, newData: string, propertyToEdit: string, identifier: string) => void;
}

function EditModal({ isOpen, onClose, value, onSave, blockTitle, propertyToEdit, identifier }: EditModalProps) {
    const [editedValue, setEditedValue] = useState(value);

    const handleSave = () => {
        onSave(blockTitle, editedValue, propertyToEdit, identifier);
        console.log(value);

        onClose()
    };
    useEffect(() => {
        setEditedValue(value);
    }, [value])



    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Set new data</Form.Label>
                    <Form.Control
                        type="text"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal;

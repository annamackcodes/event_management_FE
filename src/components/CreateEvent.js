import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateEventForm from './CreateEventForm';

const CreateEvent = ({ showModal, handleCloseModal }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateEventForm onClose={handleCloseModal} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateEvent;

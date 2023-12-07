import React, { useState, useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import styled from 'styled-components';
import CreateEvent from './CreateEvent';

const EventListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const dummyData = [
      { id: 1, name: 'Event 1', description: 'Description 1', date: '2023-12-15', location: 'Location 1', organizer: 'Organizer 1' },
      { id: 2, name: 'Event 2', description: 'Description 2', date: '2023-12-20', location: 'Location 2', organizer: 'Organizer 2' },
    ];

    setEvents(dummyData);
  }, []);

  const handleCreateEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (eventId, e) => {
    e.stopPropagation();
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <EventListContainer className="mt-4">
      <Row>
        <Col xs={12} md={6}>
          <Button variant="primary" onClick={handleCreateEvent}>
            New Event
          </Button>
        </Col>
      </Row>

      <CreateEvent showModal={showModal} handleCloseModal={handleCloseModal} />

      {events.length > 0 ? (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th>Organizer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/events/${event.id}`}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.organizer}</td>
                <td className="text-center">
                  <Button variant="danger" size="sm" onClick={(e) => handleDelete(event.id, e)}>
                    <BsTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="mt-4">No events available.</p>
      )}
    </EventListContainer>
  );
};

export default EventList;

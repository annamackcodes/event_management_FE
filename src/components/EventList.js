import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import styled from "styled-components";
import CreateEvent from "./CreateEvent";
import axios from "../services/api";

const EventListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (eventId, e) => {
    e.stopPropagation();

    try {
      await axios.delete(`/api/events/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
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

      <h2 className="mt-4">My Events:</h2>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr
                key={event.id}
                style={{ cursor: "pointer" }}
                onClick={() => (window.location.href = `/events/${event.id}`)}
              >
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{event.location}</td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => handleDelete(event.id, e)}
                  >
                    <BsTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="mt-4 text-center">
              <td colSpan="6">No events available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </EventListContainer>
  );
};

export default EventList;

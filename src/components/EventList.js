import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import CreateEvent from "./CreateEvent";
import axios from "../services/api";
import { BsTrash, BsPlus, BsCalendar } from "react-icons/bs";
import { AiOutlineEnvironment } from "react-icons/ai";

const EventListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AddEventButton = styled(Button)`
  font-size: 15px;
  border-radius: 10%;
  background-color: #28a745; /* Green color for the add button */
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838; /* Darker green color on hover */
  }
`;

const EventHeading = styled.h2`
  font-size: 28px;
  color: #007bff;
  margin-bottom: 20px;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;

  th,
  td {
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #007bff;
    color: #fff;
  }

  tbody tr {
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f8ff;
    }
  }

  .delete-button {
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .delete-button:hover {
    background-color: #c82333;
    border-color: #c82333;
  }
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

  const renderTooltip = (text) => <Tooltip id="button-tooltip">{text}</Tooltip>;

  return (
    <EventListContainer>
      <CreateEvent showModal={showModal} handleCloseModal={handleCloseModal} />

      <Row className="align-items-center">
        <Col xs={11}>
          <EventHeading>My Events</EventHeading>
        </Col>
        <Col xs={1}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Add New Event")}
          >
            <AddEventButton variant="success" onClick={handleCreateEvent}>
              <BsPlus />
            </AddEventButton>
          </OverlayTrigger>
        </Col>
      </Row>

      <StyledTable striped bordered hover responsive>
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
                onClick={() => (window.location.href = `/events/${event.id}`)}
              >
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>
                  <BsCalendar />{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <AiOutlineEnvironment /> {event.location}
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Delete Event")}
                  >
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => handleDelete(event.id, e)}
                      className="delete-button"
                    >
                      <BsTrash />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan="5">No events available</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </EventListContainer>
  );
};

export default EventList;

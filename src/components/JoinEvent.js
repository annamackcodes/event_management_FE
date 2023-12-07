import React, { useState, useEffect } from "react";
import { Table, Row } from "react-bootstrap";
import styled from "styled-components";
import CreateEvent from "./CreateEvent";
import axios from "../services/api";
import { BsCalendar } from "react-icons/bs";
import { AiOutlineEnvironment } from "react-icons/ai";

const JoinEventContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
`;

const JoinEvent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events/get_events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <JoinEventContainer>
      <CreateEvent showModal={showModal} handleCloseModal={handleCloseModal} />

      <Row className="align-items-center">
          <EventHeading>New Events to Join</EventHeading>
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
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan="5">No events available</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </JoinEventContainer>
  );
};

export default JoinEvent;

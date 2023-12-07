import React, { useState, useEffect } from "react";
import axios from "../services/api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";

const EventDetailsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(to right, #3494e6, #ec6ead);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
`;

const EventTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
`;

const EventDescription = styled.p`
  font-size: 18px;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const EventDetail = styled.p`
  font-size: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventId = window.location.pathname.split("/events/")[1];

    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  return (
    <EventDetailsContainer>
      {loading ? (
        <p>Loading...</p>
      ) : event ? (
        <>
          <EventTitle>{event.name}</EventTitle>
          <EventDescription>
            <Icon>
              <FontAwesomeIcon icon={faAlignLeft} />
            </Icon>
            {event.description}
          </EventDescription>
          <EventDetail>
            <Icon>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Icon>
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </EventDetail>
          <EventDetail>
            <Icon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </Icon>
            {event.location}
          </EventDetail>
        </>
      ) : (
        <p>Event not found</p>
      )}
    </EventDetailsContainer>
  );
};

export default EventDetails;

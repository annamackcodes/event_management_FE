import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : event ? (
        <>
          <h2>{event.name}</h2>
          <p>Description: {event.description}</p>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Organizer: {event.organizer}</p>
        </>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
};

export default EventDetails;

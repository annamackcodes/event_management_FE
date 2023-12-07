import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // const dummyEventData = [
  //   { id: 1, name: 'Event 1', description: 'Description 1', date: '2023-12-15', location: 'Location 1', organizer: 'Organizer 1' },
  //   { id: 2, name: 'Event 2', description: 'Description 2', date: '2023-12-20', location: 'Location 2', organizer: 'Organizer 2' },
  // ];

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // const selectedEvent = dummyEventData.find((event) => event.id === parseInt(eventId));
        // setEvent(selectedEvent);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
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

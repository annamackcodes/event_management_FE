import React, { useState } from 'react';
import axios from '../services/api';
import styled from 'styled-components';

const JoinEventContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const JoinEventForm = styled.form`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const FormButton = styled.button`
  background-color: #0d6efd;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;


const JoinEvent = () => {
  const [eventId, setEventId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/events/${eventId}/join`);
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  return (
    <JoinEventContainer>
      <h2>Join Event</h2>
      <JoinEventForm onSubmit={handleSubmit}>
        <FormLabel>
          Event ID:
          <FormInput
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
      </FormLabel>
      <FormButton type="submit">Join Event</FormButton>
    </JoinEventForm>
  </JoinEventContainer>
  );
};

export default JoinEvent;

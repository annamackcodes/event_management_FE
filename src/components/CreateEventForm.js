import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BsCalendar, BsGeoAlt, BsPerson } from 'react-icons/bs';
import axios from '../services/api';
import styled from 'styled-components';
import {  NotificationManager } from "react-notifications";

const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
`;

const CreateEventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    organizer: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/events', formData);
      NotificationManager.success(
        "Event created successfully!",
        "Success"      
      );
      onClose();
    } catch (error) {
      NotificationManager.success(
        "Error in creating the event.",
        "Error"      
      );
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          {/* Add icon and placeholder */}
          <Form.Group controlId="formName">
            <Form.Label>
              <BsPerson className="mr-2" /> Event Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the event name"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          {/* Add icon and placeholder */}
          <Form.Group controlId="formDate">
            <Form.Label>
              <BsCalendar className="mr-2" /> Date
            </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Select the event date"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Add icon and placeholder */}
      <Form.Group controlId="formDescription" className="mb-3">
        <Form.Label>
          <BsGeoAlt className="mr-2" /> Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a brief description of the event"
          required
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={6}>
          {/* Add icon and placeholder */}
          <Form.Group controlId="formLocation">
            <Form.Label>
              <BsGeoAlt className="mr-2" /> Location
            </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the event location"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          {/* Add icon and placeholder */}
          <Form.Group controlId="formOrganizer">
            <Form.Label>
              <BsPerson className="mr-2" /> Organizer
            </Form.Label>
            <Form.Control
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              placeholder="Enter the organizer's name"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Create Event
      </Button>
    </StyledForm>
  );
};

export default CreateEventForm;

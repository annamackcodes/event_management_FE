import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BsCalendar, BsGeoAlt, BsPerson } from "react-icons/bs";
import axios from "../services/api";
import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  display: block;
  margin: 0 auto; /* Center the button */
`;

const CreateEventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    event: {
      name: "",
      description: "",
      date: new Date(),
      location: "",
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      event: { ...formData.event, [e.target.name]: e.target.value },
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      event: { ...formData.event, date },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/events", formData);
      NotificationManager.success("Event created successfully!", "Success");
      onClose();
      window.location.reload();
    } catch (error) {
      NotificationManager.error("Error in creating the event.", "Error");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
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
          <Form.Group controlId="formDate">
            <Form.Label>
              <BsCalendar className="mr-2" /> Date
            </Form.Label>
            <DatePicker
              selected={formData.event.date}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              className="form-control"
            />
          </Form.Group>
        </Col>
      </Row>

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
      </Row>

      <StyledButton variant="primary" type="submit">
        Create Event
      </StyledButton>
    </StyledForm>
  );
};

export default CreateEventForm;

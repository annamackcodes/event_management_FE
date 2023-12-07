import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import JoinEvent from "./components/JoinEvent";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { NotificationContainer } from "react-notifications";
import { useAuth } from "./context/AuthContext";
import SignOut from "./components/SignOut";

const App = () => {
  const {
    state: { isAuthenticated },
    dispatch,
  } = useAuth();

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Event App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Event List
                  </Nav.Link>
                  <Nav.Link as={Link} to="/join">
                    Join Event
                  </Nav.Link>
                  <SignOut dispatch={dispatch} />
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/join" element={<JoinEvent />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>

      <NotificationContainer />
    </Router>
  );
};

export default App;

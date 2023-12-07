import React from 'react';
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <Row>
          <Column colClass="col-lg-4 col-sm-4 col-xs-12">
            <FooterSection title="Services">
              <FooterLink href="#">Lorem Ipsum</FooterLink>
              <FooterLink href="#">Simply dummy text</FooterLink>
              <FooterLink href="#">The printing and typesetting </FooterLink>
              <FooterLink href="#">Standard dummy text</FooterLink>
              <FooterLink href="#">Type specimen book</FooterLink>
            </FooterSection>
          </Column>

          <Column colClass="col-md-4 col-sm-4 col-xs-12">
            <FooterSection title="Page Link">
              <FooterLink href="#">Lorem Ipsum</FooterLink>
              <FooterLink href="#">Simply dummy text</FooterLink>
              <FooterLink href="#">The printing and typesetting </FooterLink>
              <FooterLink href="#">Standard dummy text</FooterLink>
              <FooterLink href="#">Type specimen book</FooterLink>
            </FooterSection>
          </Column>

          <Column colClass="col-md-4 col-sm-4 col-xs-12">
            <FooterSection title="Subscribe today">
              <div className="signup_form">
                <SubscribeForm />
              </div>
            </FooterSection>
            <div className="social_profile">
              <SocialIcons />
            </div>
          </Column>
        </Row>

        <Row>
          <Column colClass="col-lg-12 col-sm-12 col-xs-12">
            <CopyrightNotice />
          </Column>
        </Row>
      </div>
    </div>
  );
};

const Column = ({ colClass, children }) => (
  <Col className={colClass}>{children}</Col>
);

const FooterSection = ({ title, children }) => (
  <ListGroup className={`single_footer ${title.toLowerCase().replace(' ', '_')}`}>
    <ListGroup.Item as="h4">{title}</ListGroup.Item>
    <ListGroup.Item>
      <ul>{children}</ul>
    </ListGroup.Item>
  </ListGroup>
);

const FooterLink = ({ href, children }) => (
  <li><a href={href}>{children}</a></li>
);

const SubscribeForm = () => (
  <Form className="subscribe">
    <Form.Control type="text" placeholder="Enter Email Address" className="subscribe__input" />
    <Button type="button" className="subscribe__btn">
      <i className="fas fa-paper-plane"></i>
    </Button>
  </Form>
);

const SocialIcons = () => (
  <ul>
    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
  </ul>
);

const CopyrightNotice = () => (
  <p className="copyright">Copyright © 2023 <a href="#">Akdesign</a>.</p>
);

export default Footer;

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import { Outlet } from "react-router-dom";

function Landing() {
  const cardHeight = "450px";

  return (
    <>
      <Header />
      <Container className="my-4">
        <Row>
          <Col md={6}>
            <Card
              className="shadow p-4 border-0"
              style={{ height: cardHeight }}
            >
              <Card.Body>
                <Outlet />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} style={{ height: cardHeight }}>
            <div className="p-4 h-100">
              <About />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Landing;

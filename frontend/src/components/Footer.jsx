import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/Evangadi logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#0b1d3b", color: "#fff" }}
      className="pt-5 pb-3"
    >
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="mb-4 mb-md-0 text-center text-md-start">
            <img src={Logo} alt="Logo" style={{ width: "120px" }} />
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
              <a href="#" style={{ color: "#fff" }}>
                <FacebookOutlinedIcon />
              </a>
              <a href="#" style={{ color: "#fff" }}>
                <InstagramIcon />
              </a>
              <a href="#" style={{ color: "#fff" }}>
                <YouTubeIcon />
              </a>
            </div>
          </Col>

          <Col md={4} className="mb-4 mb-md-0 text-center text-sm-center">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  How it works
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="text-sm-center text-md-end text-center">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>Evangadi Networks</li>
              <li>support@evangadi.com</li>
              <li>+1-202-386-2702</li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: "#44567a" }} />
        <p className="text-center mb-0" style={{ fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} Evangadi Networks. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;

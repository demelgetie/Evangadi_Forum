import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Appstate } from "../App";
import Logo from "../assets/Evangadi logo.png";

function Header() {
  const { user, setUser } = useContext(Appstate);
  const navigate = useNavigate();
  const location = useLocation();
  const hideLogout =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleSignIn = () => {
    navigate(user ? "/home" : "/login");
  };

  return (
    <Navbar expand="md" className="px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Logo" height="40" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/how-it-works">
              How it Works
            </Nav.Link>

            {user && !hideLogout ? (
              <Button variant="outline-danger" onClick={handleLogout}>
                LOG OUT
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={handleSignIn}>
                SIGN IN
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

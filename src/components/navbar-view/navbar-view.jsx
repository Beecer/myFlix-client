import React from "react";
import { Container, Nav, Navbar,Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import './navbar-view.scss';

export function NavbarView({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if(localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };


  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand className="navbar-logo"
          href="/">myFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  {isAuth() && (
                      <Nav.Link as={Link} to='/users/username' >{user}</Nav.Link>
                  )}
                  {isAuth() && (
                    <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                  )}
                  {!isAuth() && (
                      <Nav.Link href="/">Sign-in</Nav.Link>
                  )}
                  {!isAuth() && (
                      <Nav.Link href="/register">Sign-up</Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

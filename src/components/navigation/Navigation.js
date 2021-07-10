import React, { Component } from "react";
import { Navbar, Nav, } from "react-bootstrap";
import LOGO from '../../assets/images/logo-type.png';


export class Navigation extends Component {
  render() {
    return (
      <div className="gray-background">
        <Navbar className="container" expand="lg">
          <Navbar.Brand href="#home"><img src={LOGO} alt='IoTube Analytics Dashboard' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" >
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

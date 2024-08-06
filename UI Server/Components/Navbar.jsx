import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeDetailsPage from "./EmployeeDetailsPage.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeEdit from "./EmployeeEdit.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Employee Management
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Employees List
                </Nav.Link>
                <Nav.Link as={Link} to="/create">
                  Add Employee
                </Nav.Link>
                <Nav.Link as={Link} to="/search/all">
                  Search Employee
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<EmployeeDirectory />} />
            <Route path="/search/:type" element={<EmployeeSearch />} />
            <Route path="/create" element={<EmployeeCreate />} />
            <Route path="/employee/:id" element={<EmployeeDetailsPage />} />
            <Route path="/edit/:id" element={<EmployeeEdit />} />
            <Route path="*" element={<h1>Error 404, Page not found</h1>} />
          </Routes>
        </Container>
      </div>
    );
  }
}

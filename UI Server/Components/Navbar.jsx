import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Users, UserPlus, Search, Layout } from "lucide-react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeDetailsPage from "./EmployeeDetailsPage";
import EmployeeDirectory from "./EmployeeDirectory";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDetails from "./EmployeeDetails";

class NavItem extends Component {
  render() {
    const { to, icon: Icon, children } = this.props;
    const isActive = window.location.pathname === to;

    return (
      <Nav.Link
        as={Link}
        to={to}
        className={`d-flex align-items-center gap-2 px-3 py-2 rounded-2 ${
          isActive ? "bg-primary-subtle text-primary fw-semibold" : "text-light"
        }`}
      >
        <Icon size={18} />
        {children}
      </Nav.Link>
    );
  }
}

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center gap-2"
            >
              <Layout size={24} />
              <span className="fw-bold">Employee Management</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto gap-2">
                <NavItem to="/" icon={Users}>
                  Employees List
                </NavItem>
                <NavItem to="/create" icon={UserPlus}>
                  Add Employee
                </NavItem>
                <NavItem to="/search/all" icon={Search}>
                  Search Employee
                </NavItem>
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
            <Route
              path="*"
              element={
                <div className="text-center mt-5">
                  <h1 className="text-muted">404 - Page Not Found</h1>
                  <Link to="/" className="btn btn-primary mt-3">
                    Return to Homepage
                  </Link>
                </div>
              }
            />
          </Routes>
        </Container>
      </div>
    );
  }
}

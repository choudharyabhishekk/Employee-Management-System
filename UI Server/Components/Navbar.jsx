import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeDetailsPage from "./EmployeeDetailsPage.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeEdit from "./EmployeeEdit.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Employees List</Link>
            </li>
            <li>
              <Link to="/create">Add Employee</Link>
            </li>
            <li>
              <Link to="/search/all">Search Employee</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<EmployeeDirectory />} />
          <Route path="/search/:type" element={<EmployeeSearch />} />
          <Route path="/create" element={<EmployeeCreate />} />
          <Route path="/employee/:id" element={<EmployeeDetailsPage />} />
          <Route path="/edit/:id" element={<EmployeeEdit />} />
          <Route path="*" element={<h1>Error 404, Page not found</h1>} />
        </Routes>
      </div>
    );
  }
}

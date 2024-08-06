import React from "react";
import { Table } from "react-bootstrap";
import EmployeeDetails from "./EmployeeDetails.jsx";

class EmployeeTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    const rows = this.props.employees.map((employee, index) => (
      <EmployeeDetails key={index} employeeData={employee} />
    ));

    return (
      <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Title</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Employee Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}

export default EmployeeTable;

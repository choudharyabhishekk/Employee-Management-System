import React from "react";
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
      <div>
        <table>
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
        </table>
      </div>
    );
  }
}

export default EmployeeTable;

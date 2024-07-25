import React from "react";
import { Link } from "react-router-dom";

class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async deleteEmployee(id) {
    const url = "http://localhost:3000/graphql";
    const mutation = `
    mutation Mutation($deleteEmployeeId: Int!) {
      deleteEmployee(id: $deleteEmployeeId)
    }
  `;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { deleteEmployeeId: id },
        }),
      });

      const result = await response.json();
      if (result.data.deleteEmployee) {
        this.setState((prevState) => ({
          employees: prevState.employees.filter(
            (employee) => employee.id !== id
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  render() {
    const {
      id,
      firstName = "",
      lastName = "",
      age = "",
      title = "",
      dateOfJoining = "",
      department = "",
      employeeType = "",
      currentStatus = "",
    } = this.props.employeeData || {};

    return (
      <tr>
        <td>
          {firstName} {lastName}
        </td>
        <td>{age}</td>
        <td>{title}</td>
        <td>{department}</td>
        <td>{dateOfJoining}</td>
        <td>{employeeType}</td>
        <td>{currentStatus}</td>
        <td>
          <div className="action">
            <Link className="action-btn" to={`/employee/${id}`}>
              View
            </Link>
            <Link className="action-btn" to={`/edit/${id}`}>
              Edit
            </Link>
            <button
              className="action-btn danger"
              onClick={(e) => {
                this.deleteEmployee(id);
                window.location.reload();
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default EmployeeDetails;

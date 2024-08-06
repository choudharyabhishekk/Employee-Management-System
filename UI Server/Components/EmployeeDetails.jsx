import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
// TODO: deleting not updating need to refersh dom

class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      errorMessage: "",
    };
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

      if (result.errors) {
        // Handle error from GraphQL response
        const errorMessage = result.errors[0].message;
        this.setState({ errorMessage });
        this.clearErrorMessageAfterDelay();
      } else if (result.data.deleteEmployee) {
        this.setState((prevState) => ({
          employees: prevState.employees.filter(
            (employee) => employee.id !== id
          ),
          errorMessage: "", // Clear error message on successful delete
        }));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      this.setState({
        errorMessage: "An error occurred while deleting the employee.",
      });
      this.clearErrorMessageAfterDelay();
    }
  }

  clearErrorMessageAfterDelay() {
    setTimeout(() => {
      this.setState({ errorMessage: "" });
    }, 5000); // Clear the error message after 5 seconds
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
        <td>{currentStatus === 1 ? "Active" : "Inactive"}</td>
        <td>
          <ButtonGroup>
            <Link className="btn btn-info btn-sm" to={`/employee/${id}`}>
              View
            </Link>
            <Link className="btn btn-warning btn-sm" to={`/edit/${id}`}>
              Edit
            </Link>
            <Button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.deleteEmployee(id);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
          {this.state.errorMessage && (
            <div className="text-danger mt-2">{this.state.errorMessage}</div>
          )}
        </td>
      </tr>
    );
  }
}

export default EmployeeDetails;

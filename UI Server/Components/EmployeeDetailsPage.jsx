// EmployeeDetailsPage.jsx
import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();

  return <EmployeePage navigate={navigate} params={params} />;
}

class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props.params; // Use the id from props passed by withRouter
    await this.fetchEmployee(id);
  }

  async fetchEmployee(id) {
    try {
      const response = await fetch(`http://localhost:3000/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              employee(id: ${id}) {
                id
                firstName
                lastName
                age
                title
                department
                employeeType
                currentStatus
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.data) {
        this.setState({
          employee: result.data.employee,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error loading employee:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { employee, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!employee) {
      return <div>No employee data found</div>;
    }

    return (
      <div className="emp-details">
        <h2>Employee Details</h2>
        <p>
          Name: {employee.firstName} {employee.lastName}
        </p>
        <p>Age: {employee.age}</p>
        <p>Title: {employee.title}</p>
        <p>Department: {employee.department}</p>
        <p>Joining Date: {employee.dateOfJoining}</p>
        <p>Employee Type: {employee.employeeType}</p>
        <p>Status: {employee.currentStatus}</p>
      </div>
    );
  }
}

export default EmployeeDetailsPage;

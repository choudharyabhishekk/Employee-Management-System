// EmployeeDetailsPage.jsx
import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

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
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <h2>Employee Details</h2>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Name:</strong> {employee.firstName} {employee.lastName}
            </Card.Text>
            <Card.Text>
              <strong>Age:</strong> {employee.age}
            </Card.Text>
            <Card.Text>
              <strong>Title:</strong> {employee.title}
            </Card.Text>
            <Card.Text>
              <strong>Department:</strong> {employee.department}
            </Card.Text>
            <Card.Text>
              <strong>Joining Date:</strong> {employee.dateOfJoining}
            </Card.Text>
            <Card.Text>
              <strong>Employee Type:</strong> {employee.employeeType}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong>{" "}
              {employee.currentStatus == 1 ? "Active" : "Inactive"}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default EmployeeDetailsPage;

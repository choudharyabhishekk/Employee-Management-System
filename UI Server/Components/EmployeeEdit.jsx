import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
function EmployeeEdit() {
  const navigate = useNavigate();
  const params = useParams();

  return <EditEmployeePage navigate={navigate} params={params} />;
}

class EditEmployeePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {
        title: "",
        department: "",
        currentStatus: 0,
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
      },
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  async fetchEmployee() {
    const { id } = this.props.params;
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
              dateOfJoining
              department
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
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, department, currentStatus } = this.state.employee;
    const { id } = this.props.params;
    const url = "http://localhost:3000/graphql";
    const mutation = `
      mutation {
        updateEmployee(id: ${id}, updates: {
          title: "${title}",
          department: "${department}",
          currentStatus: ${currentStatus}
        }) {
          id
          title
          department
          currentStatus
        }
      }
    `;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.data) {
        this.props.navigate("/");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  render() {
    const { employee, loading } = this.state;

    if (loading) return <div>Loading...</div>;

    return (
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <h2>Edit Employee </h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={`${employee.firstName} ${employee.lastName}`}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={employee.age}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="dateOfJoining">
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  type="text"
                  name="dateOfJoining"
                  value={employee.dateOfJoining}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="select"
                  id="title"
                  name="title"
                  value={employee.title}
                  onChange={this.handleChange}
                >
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="VP">VP</option>
                  <option value="Employee">Employee</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  id="department"
                  name="department"
                  value={employee.department}
                  onChange={this.handleChange}
                >
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="currentStatus">
                <Form.Label>Current Status</Form.Label>
                <Form.Control
                  type="number"
                  name="currentStatus"
                  value={employee.currentStatus}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button className="mt-4" variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default EmployeeEdit;

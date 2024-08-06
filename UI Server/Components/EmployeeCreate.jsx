import React from "react";

import { Form, Button, Alert, Container, Card } from "react-bootstrap";
class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: 1,
      },
      errors: {},
      successMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm(employee) {
    const errors = {};
    if (!employee.firstName) errors.firstName = "Error! First name is required";
    if (!employee.lastName) errors.lastName = "Error! Last name is required";
    if (!employee.age) errors.age = "Error! Age is required";
    else if (employee.age < 20 || employee.age > 70)
      errors.age = "Error! Age must be between 20 to 70 years";
    if (!employee.dateOfJoining)
      errors.dateOfJoining = "Error! Date of joining is required";
    if (!employee.title) errors.title = "Error! Title is required";
    if (!employee.department)
      errors.department = "Error! Department is required";
    if (!employee.employeeType)
      errors.employeeType = "Error! Employee type is required";

    return errors;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = document.forms.addEmployee;

    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: 1,
    };

    const errors = this.validateForm(employee);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    console.log(employee);

    const mutation = `
      mutation addEmployee($employee: employeeInput!) {
        addEmployee(employee: $employee) {
          id
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }
    `;

    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { employee: employee },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      const result = await response.json();
      console.log(result);
      console.log("Employee created successfully:", result.data.addEmployee);

      this.setState({
        successMessage: "Employee added successfully!",
        employee: {
          firstName: "",
          lastName: "",
          age: "",
          dateOfJoining: "",
          title: "",
          department: "",
          employeeType: "",
          currentStatus: 1,
        },
        errors: {},
      });

      form.reset();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  }

  render() {
    const { errors, successMessage } = this.state;
    return (
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <h2>Add New Employee </h2>
          </Card.Header>
          <Card.Body>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            <Form name="addEmployee" onSubmit={this.handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName}</p>
                )}
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName}</p>
                )}
              </Form.Group>

              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" />
                {errors.age && <p className="text-danger">{errors.age}</p>}
              </Form.Group>

              <Form.Group controlId="dateOfJoining">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control type="date" name="dateOfJoining" />
                {errors.dateOfJoining && (
                  <p className="text-danger">{errors.dateOfJoining}</p>
                )}
              </Form.Group>

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control as="select" name="title">
                  <option value="">Select Title</option>
                  <option value="Employee">Employee</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="VP">VP</option>
                </Form.Control>
                {errors.title && <p className="text-danger">{errors.title}</p>}
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control as="select" name="department">
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                </Form.Control>
                {errors.department && (
                  <p className="text-danger">{errors.department}</p>
                )}
              </Form.Group>

              <Form.Group controlId="employeeType">
                <Form.Label>Employee Type</Form.Label>
                <Form.Control as="select" name="employeeType">
                  <option value="">Select Employee Type</option>
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </Form.Control>
                {errors.employeeType && (
                  <p className="text-danger">{errors.employeeType}</p>
                )}
              </Form.Group>

              <Button className="mt-4" variant="primary" type="submit">
                Add Employee
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default EmployeeCreate;

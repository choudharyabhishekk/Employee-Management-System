import React from "react";

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
      <div>
        <h2>Add New Employee</h2>
        <hr />
        {successMessage && <p className="success">{successMessage}</p>}
        <form name="addEmployee" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
          />
          {errors.age && <p className="error">{errors.age}</p>}

          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
          />
          {errors.dateOfJoining && (
            <p className="error">{errors.dateOfJoining}</p>
          )}

          <label htmlFor="title">Title</label>
          <select
            className="form-select"
            id="title"
            name="title"
          >
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Director">Director</option>
            <option value="Manager">Manager</option>
            <option value="VP">VP</option>
          </select>
          {errors.title && <p className="error">{errors.title}</p>}

          <label htmlFor="department">Department</label>
          <select
            className="form-select"
            id="department"
            name="department"
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>
          {errors.department && <p className="error">{errors.department}</p>}

          <label htmlFor="employeeType">Employee Type</label>
          <select
            className="form-select"
            id="employeeType"
            name="employeeType"
          >
            <option value="">Select Employee Type</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          {errors.employeeType && (
            <p className="error">{errors.employeeType}</p>
          )}

          <input type="submit" value="Add Employee" className="btn" />
        </form>
      </div>
    );
  }
}

export default EmployeeCreate;

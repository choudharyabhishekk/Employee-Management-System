import React from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";

// Parent component
class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const url = "http://localhost:3000/graphql";
    const query = `
      query {
        employees {
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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (result.data) {
        this.setState({ employees: result.data.employees });
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  render() {
    return (
      <div>
        <h2>Employee List</h2>
        <hr />
        <EmployeeTable
          employees={this.state.employees}
          onDelete={this.deleteEmployee}
        />
      </div>
    );
  }
}

export default EmployeeDirectory;

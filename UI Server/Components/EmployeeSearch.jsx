import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeTable from "./EmployeeTable.jsx";

const searchQuery = `
  query searchEmployees($employeeType: String) {
    searchEmployees(employeeType: $employeeType) {
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

const EmployeeSearch = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const { type } = useParams();
    return <WrappedComponent navigate={navigate} type={type} {...props} />;
  };
};

class EmployeeSearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      employeeType: props.type || "all",
      initialType: props.type || "all",
    };
  }

  componentDidMount() {
    this.searchEmployees(this.state.initialType);
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (type !== this.state.initialType) {
      this.props.navigate(`/search/${this.state.initialType}`);
    }
  }

  async searchEmployees(employeeType) {
    try {
      const url = "http://localhost:3000/graphql";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          variables: {
            employeeType: employeeType === "all" ? "" : employeeType,
          },
        }),
      });

      const result = await response.json();
      if (result.data && result.data.searchEmployees) {
        this.setState({ results: result.data.searchEmployees });
      }
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      employeeType: value,
      initialType: value,
    });
    this.props.navigate(`/search/${value}`);
    this.searchEmployees(value);
  };

  render() {
    const { results, employeeType } = this.state;

    return (
      <div>
        <form>
          <div>
            <label htmlFor="employeeTypes">Employee Type</label>
            <select
              id="employeeType"
              name="employeeType"
              value={employeeType}
              onChange={this.handleChange}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
        </form>
        <EmployeeTable employees={results} />
      </div>
    );
  }
}

export default EmployeeSearch(EmployeeSearchWrapper);

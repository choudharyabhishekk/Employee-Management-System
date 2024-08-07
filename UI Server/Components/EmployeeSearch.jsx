import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeTable from "./EmployeeTable.jsx";
import { Form, Container } from "react-bootstrap";

const searchQuery = `
  query searchEmployees($employeeType: String, $upcomingRetirement: Boolean) {
    searchEmployees(employeeType: $employeeType, upcomingRetirement: $upcomingRetirement) {
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
      upcomingRetirement: false,
    };
  }

  componentDidMount() {
    this.searchEmployees(
      this.state.employeeType,
      this.state.upcomingRetirement
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.props;
    if (
      type !== this.state.employeeType ||
      prevState.upcomingRetirement !== this.state.upcomingRetirement
    ) {
      this.searchEmployees(
        this.state.employeeType,
        this.state.upcomingRetirement
      );
    }
  }

  async searchEmployees(employeeType, upcomingRetirement) {
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
            upcomingRetirement,
          },
        }),
      });

      const result = await response.json();
      if (result.data && result.data.searchEmployees) {
        this.setState({ results: result.data.searchEmployees });
      } else {
        console.error("No data received or error in query execution");
      }
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  }

  handleTypeChange = (event) => {
    const value = event.target.value;
    this.setState({
      employeeType: value,
    });
  };

  handleRetirementChange = (event) => {
    const value = event.target.checked;
    this.setState({
      upcomingRetirement: value,
    });
  };

  handleSearch = () => {
    const { employeeType, upcomingRetirement } = this.state;
    this.searchEmployees(employeeType, upcomingRetirement);
  };

  render() {
    const { results, employeeType, upcomingRetirement } = this.state;

    return (
      <Container className="mt-4">
        <Form>
          <Form.Group controlId="employeeType">
            <Form.Label>Employee Type</Form.Label>
            <Form.Control
              as="select"
              name="employeeType"
              value={employeeType}
              onChange={this.handleTypeChange}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="upcomingRetirement">
            <Form.Check
              type="checkbox"
              label="Upcoming Retirement"
              checked={upcomingRetirement}
              onChange={this.handleRetirementChange}
            />
          </Form.Group>
          <button
            type="button"
            onClick={this.handleSearch}
            className="btn btn-primary mt-3"
          >
            Search
          </button>
        </Form>
        <EmployeeTable employees={results} />
      </Container>
    );
  }
}

export default EmployeeSearch(EmployeeSearchWrapper);

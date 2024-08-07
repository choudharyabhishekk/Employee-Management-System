const typeDefs = `
  type Employee {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
  }

  input employeeInput {
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
  }

  input employeeUpdateInput {
    title: String
    department: String
    currentStatus: Int
  }

  type Query {
    employees: [Employee]
    searchEmployees(employeeType: String, upcomingRetirement: Boolean): [Employee]
    employee(id: Int!): Employee
  }

  type Mutation {
    addEmployee(employee: employeeInput!): Employee!
    updateEmployee(id: Int!, updates: employeeUpdateInput!): Employee!
    deleteEmployee(id: Int!): Boolean!
  }
`;

module.exports = { typeDefs };

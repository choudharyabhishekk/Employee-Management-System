const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({ path: "api.env" });

const DB_URL = process.env.DB_URL;
const DB_NAME = "employeeManagementSystem";
let db;

async function connect2Db() {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function getDbEmployees() {
  const employees = await db.collection("employees").find({}).toArray();
  return employees;
}

async function getDbEmployee(id) {
  const employee = await db.collection("employees").findOne({ id });
  return employee;
}

async function addDbEmployee(employee) {
  try {
    const employees = await db.collection("employees");
    await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "employee" },
        { $inc: { current: 1 } },
        { upsert: true, returnDocument: "after" }
      );

    const employeeId = await db
      .collection("counters")
      .findOne({ _id: "employee" });
    const getNewId = employeeId.current;
    console.log(getNewId);

    const newEmployee = { id: getNewId, ...employee };
    employees.insertOne(newEmployee);
    return newEmployee;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
}

async function searchDbEmployees(_, { employeeType }) {
  try {
    const query = employeeType ? { employeeType } : {};
    const employees = await db.collection("employees").find(query).toArray();
    return employees;
  } catch (error) {
    console.error("Error searching employees:", error);
    throw error;
  }
}

async function updateDbEmployee(id, updates) {
  const result = await db
    .collection("employees")
    .findOneAndUpdate({ id }, { $set: updates }, { returnOriginal: false });
  return result.value;
}

async function deleteDbEmployee(id) {
  // Fetch the employee to check the currentStatus
  const employee = await db.collection("employees").findOne({ id });

  if (!employee) {
    throw new Error("Employee not found");
  }

  // Check if the currentStatus is 1
  if (employee.currentStatus === 1) {
    throw new Error("Can't delete Employee- Status Active");
  }
  const result = await db.collection("employees").deleteOne({ id });
  return true;
}

const resolvers = {
  Query: {
    employees: async () => {
      return await getDbEmployees();
    },
    employee: async (_, { id }) => {
      return await getDbEmployee(id);
    },
    searchEmployees: async (_, { employeeType }) => {
      return await searchDbEmployees(null, { employeeType });
    },
  },
  Mutation: {
    addEmployee: async (_, { employee }) => {
      return await addDbEmployee(employee);
    },
    updateEmployee: async (_, { id, updates }) => {
      return await updateDbEmployee(id, updates);
    },
    deleteEmployee: async (_, { id }) => {
      return await deleteDbEmployee(id);
    },
  },
};

module.exports = {
  connect2Db,
  getDbEmployees,
  getDbEmployee,
  searchDbEmployees,
  addDbEmployee,
  updateDbEmployee,
  deleteDbEmployee,
  resolvers,
};

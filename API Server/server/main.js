const express = require("express");
require("dotenv").config({ path: "api.env" });
const { ApolloServer } = require("apollo-server-express");
const { connect2Db, resolvers } = require("./dbserver");
const { typeDefs } = require("./schema");

const app = express();
const PORT = process.env.BACKEND_APP_PORT;

const server = new ApolloServer({ typeDefs, resolvers });

connect2Db()
  .then(() => {
    server.start().then(() => {
      server.applyMiddleware({ app, path: "/graphql" });

      app.use(express.static("public"));

      app.listen(PORT, () => {
        console.log(
          `----------- Backend started on port http://localhost:${PORT} -----------`
        );
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

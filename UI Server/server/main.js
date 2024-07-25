const express = require("express");
const app = express();
require("dotenv").config({ path: "ui.env" });
const PORT = process.env.APP_PORT;

// middleware
app.use(express.static("public"));

// listening
app.listen(PORT, function () {
  console.log(
    `----------- App Front End started on port http://localhost:${PORT} -------------`
  );
});

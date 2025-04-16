const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api.router");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors,
} = require("./middleware/errorHandlers");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter); 

// Error handlers
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleRouteErrors);
app.use(handleServerErrors);

module.exports = app;

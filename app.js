const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api.router");
const cors = require('cors')

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors,
} = require("./middleware/errorHandlers");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRouter); 


// ERROR HANDLERS
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleRouteErrors);
app.use(handleServerErrors);

module.exports = app;

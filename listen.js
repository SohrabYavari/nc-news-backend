const app = require("./app");
const PORT = process.env.PORT || 9090;


app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}/api`);
});

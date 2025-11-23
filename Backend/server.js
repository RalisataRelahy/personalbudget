const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expenseRoutes = require("./routes/expenses");
const userRoutes = require("./routes/login&signup");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes);
app.listen(3000, () => console.log("Backend running on port 3000"));

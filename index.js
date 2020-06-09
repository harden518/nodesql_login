const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

const Users = require("./routes/Users");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/", Users);

app.listen(port, () => {
  console.log(`Server is runnig on port :${port}`);
});

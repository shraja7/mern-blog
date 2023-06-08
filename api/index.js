//set up express server
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  res.json("Test");
});

app.listen(4000, () => console.log("listening at 4000"));

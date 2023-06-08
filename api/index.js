//set up express server
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config({ path: "../.env" });

//middleware including parsing json
app.use(express.json());
app.use(cors());

//connect to mongoose using url from .env file
mongoose.connect(process.env.MONGO_URL);

app.post("/register", async (req, res) => {
  //respond with user and password from request body
  const { username, password } = req.body;
  //create new user, do try catch to catch errors
  try {
    const userDoc = await User.create({ username, password });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(4000, () => console.log("listening at 4000"));

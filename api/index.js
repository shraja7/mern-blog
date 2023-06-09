//set up express server
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "../.env" });

//middleware including parsing json
app.use(express.json());
app.use(cookieParser());

//include credentials in cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//hash password
const salt = 10;

//connect to mongoose using url from .env file
mongoose.connect(process.env.MONGO_URL);

app.post("/register", async (req, res) => {
  //respond with user and password from request body
  const { username, password } = req.body;
  //create new user, do try catch to catch errors
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//route for login

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    jwt.sign(
      { username, id: userDoc._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      }
    );
  } else {
    //not logged in
    res.status(400).json({ message: "wrong credentials" });
  }
});

// profile endpoint
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// logout endpoint
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logout successful");
});

app.listen(4000, () => console.log("listening at 4000"));

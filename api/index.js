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
const secret = "s56f4as6d5f4s6d5f4sd5f4";

//include credentials in cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//hash password
const salt = 10;
//secret for jwt

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
  try {
    const { username, password } = req.body;

    // Find the user document
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = bcrypt.compareSync(password, userDoc.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    // Generate and send the JWT token
    const token = jwt.sign({ username, id: userDoc._id }, secret, {});
    res.cookie("token", token).json({
      id: userDoc._id,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// profile endpoint
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  try {
    console.log("Received token:", token); // Debug statement
    const info = jwt.verify(token, secret);
    console.log("Decoded token info:", info); // Debug statement
    res.json(info);
  } catch (error) {
    console.error("Token verification error:", error); // Debug statement
    res.status(401).json({ message: "Invalid or missing token" });
  }
});
// logout endpoint
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logout successful");
});

app.listen(4000, () => console.log("listening at 4000"));

//set up express server
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../.env" });

//middleware including parsing json
app.use(express.json());
app.use(cors());

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
// ... Your existing code ...

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  bcrypt.compare(password, userDoc.password, async (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else if (result) {
      try {
        const token = jwt.sign(
          { username, id: userDoc._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" } // Set token expiration time
        );
        res.json({ token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  });
});

// ... Rest of your code ...

app.listen(4000, () => console.log("listening at 4000"));

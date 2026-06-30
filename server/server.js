const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors")


const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
});

// Model
const User = mongoose.model("User", userSchema);

// Insert User
app.post("/users", async (req, res) => {
  try {
    const { name, userName } = req.body;

    if (!userName) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const user = await User.create({ name, userName });

    res.status(201).json({
      message: "User inserted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
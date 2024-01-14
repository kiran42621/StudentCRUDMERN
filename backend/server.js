const express = require("express");
const Student = require("./models/studentModel");

const app = express();
const port = 5000;

const mongoose = require("mongoose");

// Middlewares
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/students").then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
  });
});

app.get("/student", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/student", async (req, res) => {
  try {
    console.log(req.body);
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);
    if (!student) {
      return res
        .status(404)
        .json({ message: `Cannot find student with id ${id}` });
    }
    const update = await Student.findById(id);
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    console.log(student);
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

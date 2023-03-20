const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./model.js");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/userDBnotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/add", async (req, res) => {
  const newNote = new Note(req.body);

  try {
    await newNote.save();
    console.log("New Note Added Successfully");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.idNote;

  try {
    await Note.findByIdAndDelete(id);
    console.log("deleted succesfully");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

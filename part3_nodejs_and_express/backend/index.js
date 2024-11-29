const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const Note = require("./models/notes.js");
const errorHandler = require("./middleware/errorHandler");

const app = express();
dotenv.config();

// 0vgLSC8dN2JOUbuS

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end;
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id).then((result) => {
    res
      .status(204)
      .json({ message: ` ${result} has been successfully deleted` });
  });
});

app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Note = require("./models/notes.js");
const errorHandler = require("./middleware/errorHandler.js");
const config = require("./utils/config.js");
const notesRouter = require("./controllers/notes.js");
const notes = require("./models/notes.js");

dotenv.config();

const connectDB = async function () {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/notes", notesRouter);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes", (req, res) => {
//   Note.find({}).then((result) => {
//     res.json(result);
//   });
// });

// app.get("/api/notes/:id", (req, res, next) => {
//   Note.findById(req.params.id)
//     .then((note) => {
//       if (note) {
//         res.json(note);
//       } else {
//         res.status(404).end;
//       }
//     })
//     .catch((error) => next(error));
// });

// app.delete("/api/notes/:id", (req, res) => {
//   Note.findByIdAndDelete(req.params.id).then((result) => {
//     res
//       .status(204)
//       .json({ message: ` ${result} has been successfully deleted` });
//   });
// });

// app.post("/api/notes", (req, res, next) => {
//   const body = req.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       res.json(savedNote);
//     })
//     .catch((error) => next(error));
// });

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

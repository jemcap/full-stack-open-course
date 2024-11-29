const notesRouter = require("express").Router();
const Note = require("../models/notes");

notesRouter.get("/", async (req, res, next) => {
  try {
    const findNote = await Note.find({});
    return res.status(200).json(findNote);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

notesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const findId = await Note.findById(id);
    if (findId) {
      return res.status(200).json(findId);
    }
    res.status(404).send({ error: "Cannot retrieve Note ID" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

notesRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await Note.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ data: user, message: "User has been successfully removed." });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

notesRouter.post("/", async (req, res, next) => {
  const { content, important } = req.body;

  if (!content) {
    return res.status(404).send({ error: "Content is missing" });
  }

  try {
    const newNote = new Note({
      content,
      important,
    });
    if (newNote) {
      const savedNote = await newNote.save();
      return res
        .status(201)
        .json({ data: savedNote, message: "Successfully created Note." });
    }
    return res.status(400).send({ error: "Error creating Note" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error });
  }
});

module.exports = notesRouter;

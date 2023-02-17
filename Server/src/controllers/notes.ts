import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CreateNoteBody {
  title?: string;
  text?: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

interface UpdateNoteParams {
  noteId: string;
}

//alternative instead of set type for req,res,next we can set type for requesthandler
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  if (!mongoose.isValidObjectId(noteId)) {
    next(createHttpError(400, "Invalid note id"));
  }
  await NoteModel.findById(noteId)
    .then((result) => {
      if (!result) {
        next(createHttpError(400, "Note not found"));
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "id is invalid");
    }
    if (!newTitle) {
      throw createHttpError(400, "Note must have a title");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(400, "Note not found");
    }
    note.title = newTitle;
    note.text = newText;
    const updateNote = await note.save();
    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid NoteId");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    await note.remove();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

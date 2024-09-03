import api from "./http";
import { Note } from "../components/typeComponent";

export const getNotes = () => {
  return api.get("/notes");
};

export const createNote = (note: Omit<Note, "_id"| "user">) => {
  return api.post("/notes", note);
};

export const updateNote = (note: Note) => {
  return api.put(`/notes/${note._id}`, note);
};

export const deleteNote = (noteId: string) => {
  return api.delete(`/notes/${noteId}`);
};

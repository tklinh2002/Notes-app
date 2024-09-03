import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../components/typeComponent";
import { getNotes } from "../api/note.api";

const initialState: Note[] = [];
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await getNotes(); // Adjust the URL as needed
  if (!response) {
    throw new Error("Failed to fetch notes");
  }
  return response;
});
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex((note) => note._id == action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter((note) => note._id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      return action.payload.data;
    });
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;

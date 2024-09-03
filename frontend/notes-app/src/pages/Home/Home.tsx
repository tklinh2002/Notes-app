import { useEffect, useState } from "react";
import ModalAddNote from "../../components/ModalAddNote/ModalAddNote";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import { Note } from "../../components/typeComponent";
import { useAppDispatch, useAppSelector } from "../../store";
import { addNote, fetchNotes } from "../../features/noteSlice";
import { createNote } from "../../api/note.api";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleAddNote = async (note: Omit<Note, "_id" | "user">) => {
    const res = await createNote(note);
    dispatch(addNote(res.data));
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <button
        className="absolute right-0 bottom-0 m-4 bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Add Note
      </button>
      <div className="w-full grid grid-cols-3 gap-4 m-4">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            title={note.title}
            content={note.content}
            createdAt={note.createdAt}
            tags={note.tags}
            isPinned={note.isPinned}
            onDelete={() => {}}
            onEdit={() => {}}
            onPin={() => {}}
          />
        ))}
      </div>
      <ModalAddNote
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddNote={handleAddNote}
      />
    </div>
  );
};
export default Home;

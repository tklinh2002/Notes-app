import React, { useState } from "react";
import Modal from "react-modal";
import { Note } from "../typeComponent";

const ModalAddNote = ({
  isOpen,
  onRequestClose,
  onAddNote,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddNote: (note: Omit<Note, "_id" | "user">) => void;
}) => {
  const [note, setNote] = useState<Omit<Note, "_id" |  "user">>({
    title: "",
    content: "",
    createdAt: new Date().toISOString(),
    tags: [],
    isPinned: false,
  });
  const [tag, setTag] = useState("");
  const handleAddNote = () => {
    onAddNote(note);
    setNote({
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
      tags: [],
      isPinned: false,
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      className={
        "w-[60%] h-[70%] bg-white rounded-md overflow-y-scroll justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      }
    >
      <h1 className="text-2xl text-center">Add a Note</h1>
      <div className="flex flex-col m-4">
        <label htmlFor="title" className="text-sm font-bold">
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
      </div>
      <div className="flex flex-col m-4">
        <label htmlFor="content" className="text-sm font-bold">
          Content
        </label>
        <textarea
          placeholder="Content"
          className="border border-gray-300 rounded-md p-2 h-40"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
      </div>
      <div className="flex flex-col m-4">
        <label htmlFor="tags" className="text-sm font-bold">
          Tags
        </label>
        <div className="flex flex-wrap">
          {note.tags.map((tag, index) => (
            <p key={index} className="m-1 text-indigo-500 italic">
              {tag}
            </p>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a tag"
            className="border border-gray-300 rounded-md p-2 mr-2"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            onClick={() => {
              setNote({ ...note, tags: [...note.tags, "#" + tag] });
              setTag("");
            }}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add tag
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            setNote({
              title: "",
              content: "",
              createdAt: new Date().toISOString(),
              tags: [],
              isPinned: false,
            });
            setTag("");
            onRequestClose();
          }}
          className="mr-2 p-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAddNote}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Note
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddNote;

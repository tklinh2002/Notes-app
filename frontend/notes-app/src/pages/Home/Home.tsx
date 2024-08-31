import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="w-full grid grid-cols-3 gap-4 m-4">
        <NoteCard
          title="Note 1"
          content="This is the content of note 1"
          date="2021-01-01"
          tags={["tag1", "tag2"]}
          isPinned={false}
          onDelete={() => {}}
          onEdit={() => {}}
          onPin={() => {}}
        />
        <NoteCard
          title="Note 1"
          content="This is the content of note 1"
          date="2021-01-01"
          tags={["tag1", "tag2"]}
          isPinned={false}
          onDelete={() => {}}
          onEdit={() => {}}
          onPin={() => {}}
        />
        <NoteCard
          title="Note 1"
          content="This is the content of note 1"
          date="2021-01-01"
          tags={["tag1", "tag2"]}
          isPinned={false}
          onDelete={() => {}}
          onEdit={() => {}}
          onPin={() => {}}
        />
        <NoteCard
          title="Note 1"
          content="This is the content of note 1"
          date="2021-01-01"
          tags={["tag1", "tag2"]}
          isPinned={false}
          onDelete={() => {}}
          onEdit={() => {}}
          onPin={() => {}}
        />
      </div>
    </div>
  );
};
export default Home;

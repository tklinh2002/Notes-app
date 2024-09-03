import { IoIosTrash } from "react-icons/io";
import { NoteCardProps } from "../typeComponent";
import { GiPin } from "react-icons/gi";
import { MdOutlineEdit } from "react-icons/md";
const NoteCard = ({
  title,
  content,
  createdAt,
  tags,
  isPinned,
  onDelete,
  onEdit,
  onPin,
}: NoteCardProps) => {
  return (
    <div className="flex flex-col gap-2 h-fit w-full justify-between bg-white shadow-md hover:shadow-blue-700 transition-all duration-300 rounded-md p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium w-full">{title}</h1>
        <button onClick={onPin}>
          <GiPin size={25} color={isPinned ? "blue" : "gray"} />
        </button>
      </div>
      <p className="text-sm text-gray-500">{createdAt}</p>
      <p className="text-sm text-gray-500">{content}</p>
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">
          {tags.map((tag) => "#" + tag + " ")}
        </p>
        <div className="flex items-center gap-2">
          <button onClick={onEdit}>
            <MdOutlineEdit size={25} color="gray" />
          </button>
          <button onClick={onDelete}>
            <IoIosTrash size={25} color="gray" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default NoteCard;

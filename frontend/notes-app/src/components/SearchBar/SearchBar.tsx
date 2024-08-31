import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="w-80 items-center rounded-md bg-slate-200 px-4 flex">
      <input
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm bg-transparent py-[11px] px-4 focus:outline-none outline-neutral-800"
      />
      {value && (
        <button onClick={() => onChange("")} className="text-neutral-800 hover:text-neutral-900 transition-all duration-300 mr-2">
          <IoMdClose size={20} />
        </button>
      )}
      <button className="text-neutral-800   hover:text-neutral-900 transition-all duration-300">
        <FaMagnifyingGlass size={20} />
      </button>
    </div>
  );
};
export default SearchBar;

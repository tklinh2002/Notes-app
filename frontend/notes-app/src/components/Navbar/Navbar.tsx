import { getInitials } from "../../utils/helper";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from 'react';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h1 className="text-xl font-medium">Notes App</h1>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <div className="flex items-center gap-4 justify-center">
        <div className="rounded-full bg-teal-500 p-2">
          <p>{getInitials("Jonh Doe H")}</p>
        </div>
        <div className="flex flex-col">
          <p>Jonh Doe</p>
          <button onClick={handleLogout} className="btn-primary bg-gray-500">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

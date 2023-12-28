import { FaRegAddressCard } from "react-icons/fa";
const SearchBar = () => {
  return (
    <div className="flex flex-row items-center justify-between border-b border-secondary">
      <div className="m-8 w-1/3 ">
        <form className="flex flex-row justify-between">
          <input
            className="p-2 rounded-md w-3/4 shadow"
            type="text"
            value=""
            onChange=""
            placeholder="Type to search"
          />
          <button
            className="p-2 border-1 bg-secondary rounded-md hover:bg-primary hover:text-secondary shadow"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="border-1 p-2 rounded-md bg-secondary hover:bg-primary hover:text-secondary m-8 flex flex-row justify-between items-center space-x-2 shadow">
        <FaRegAddressCard />
        <button>New</button>
      </div>
    </div>
  );
};

export default SearchBar;

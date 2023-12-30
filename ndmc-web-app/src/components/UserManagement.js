import React, { useState } from "react";
import SearchBar from "./SearchBar";
import UserListView from "./UserListView";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="overflow-y-scroll" style={{ height: "90%" }}>
        <SearchBar />
        <UserListView page={page} />
      </div>
      <div className="bg-primary" style={{ height: "10%" }}>
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setPage(1)}
            className="text-gray-700 px-4 py-2 rounded"
          >
            1
          </button>
          <button
            onClick={() => setPage(2)}
            className="text-gray-700 px-4 py-2 rounded"
          >
            2
          </button>
          <button
            onClick={() => setPage(3)}
            className="text-gray-700 px-4 py-2 rounded"
          >
            3
          </button>
        </div>
      </div>
    </>
  );
};

export default UserManagement;

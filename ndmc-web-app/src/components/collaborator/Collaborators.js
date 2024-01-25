import React, { useState } from "react";
import CollaboratorListView from "./CollaboratorListView";
import SearchBar from "../SearchBar";

const Collaborators = () => {
  const [searchName, setSearchName] = useState("");
  return (
    <>
      <div className="overflow-y-scroll" style={{ height: "95%" }}>
        <SearchBar handleSearch={setSearchName} />
        <CollaboratorListView />
      </div>
      {/* <div className="bg-primary" style={{ height: "10%" }}>
        <div className="flex justify-center items-center space-x-2 w-1/3 m-auto h-full ">
          NDMC
        </div>
      </div> */}
    </>
  );
};

export default Collaborators;

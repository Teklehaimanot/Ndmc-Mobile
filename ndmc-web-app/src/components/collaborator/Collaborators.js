import React, { useState } from "react";
import CollaboratorListView from "./CollaboratorListView";
import { FaRegAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";

const Collaborators = () => {
  return (
    <>
      <div className="overflow-y-scroll" style={{ height: "95%" }}>
        <div className="flex flex-row items-center justify-between border-b border-secondary">
          <div className="m-8 w-1/3 text-blue text-xl bg-secondary p-3 rounded shadow-md ">
            NDMC Collaborators
          </div>
          <Link
            to="register"
            className="border-1 p-2 rounded-md bg-secondary hover:bg-primary hover:text-secondary m-8 flex flex-row justify-between items-center space-x-2 shadow"
          >
            <FaRegAddressCard />
            <button>ADD</button>
          </Link>
        </div>
        <CollaboratorListView />
      </div>
    </>
  );
};

export default Collaborators;

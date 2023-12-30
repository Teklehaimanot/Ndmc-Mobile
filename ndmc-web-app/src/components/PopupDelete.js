import React from "react";
import Popup from "reactjs-popup";
import { MdDeleteOutline } from "react-icons/md";
const PopupDelete = () => {
  return (
    <Popup
      trigger={
        <button>
          <MdDeleteOutline className="text-2xl hover:text-error" />
        </button>
      }
      position="left center"
    >
      {(close) => (
        <div className="modal">
          <div className="content text-error p-2 my-2">
            Are you sure you want to delete this ?
          </div>
          <div>
            <button
              className="bg-primary px-3 py-1 rounded text-secondary hover:bg-blue"
              onClick={() => {
                console.log("delte");
                close();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopupDelete;

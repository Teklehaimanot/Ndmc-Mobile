import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupDelete = () => (
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

const UserListView = () => {
  return (
    <div className="w-full ">
      <table className="w-full flex flex-col justify-between bg-secondary mt-8 py-2">
        <tr className=" flex flex-row justify-between items-center   text-blue py-4 my-3  border-b">
          <th className="w-1/5 ">Name</th>
          <th className="w-1/5 ">Eamil</th>
          <th className="w-1/5 ">Role</th>
          <th className="w-1/5">Edit</th>
          <th className="w-1/5">Delete</th>
        </tr>
        <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark text-sm">
          <td className="w-1/5 text-center">
            Alfreds Futterkiste ljsj ljlsj lkjs j
          </td>
          <td className="w-1/5 text-center">Maria Anders</td>
          <td className="w-1/5 text-center">Germany</td>
          <td className="w-1/5 text-center">
            <Link className=" text-xl hover:text-primary" to="tekle">
              <FaEdit className="mx-auto" />
            </Link>
          </td>
          <td className="w-1/5 text-center">
            <PopupDelete />
          </td>
        </tr>
        <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark">
          <td className="w-1/5 text-center">
            Alfreds Futterkiste ljsj ljlsj lkjs j
          </td>
          <td className="w-1/5 text-center">Maria Anders</td>
          <td className="w-1/5 text-center">Germany</td>
          <td className="w-1/5 text-center">
            <Link className=" text-xl hover:text-primary" to="tekle">
              <FaEdit className="mx-auto" />
            </Link>
          </td>
          <td className="w-1/5 text-center">
            <PopupDelete />
          </td>
        </tr>
        <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark">
          <td className="w-1/5 text-center">
            Alfreds Futterkiste ljsj ljlsj lkjs j
          </td>
          <td className="w-1/5 text-center">Maria Anders</td>
          <td className="w-1/5 text-center">Germany</td>
          <td className="w-1/5 text-center">
            <Link className=" text-xl hover:text-primary" to="tekle">
              <FaEdit className="mx-auto" />
            </Link>
          </td>
          <td className="w-1/5 text-center">
            <PopupDelete />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default UserListView;

import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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
        <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark">
          <td className="w-1/5 text-center">
            Alfreds Futterkiste ljsj ljlsj lkjs j
          </td>
          <td className="w-1/5 text-center">Maria Anders</td>
          <td className="w-1/5 text-center">Germany</td>
          <FaEdit className="w-1/5 text-center text-xl hover:text-primary" />
          <MdDeleteOutline className="w-1/5 text-center text-2xl hover:text-error" />
        </tr>
        <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark">
          <td className="w-1/5 text-center">
            Alfreds Futterkiste ljsj ljlsj lkjs j
          </td>
          <td className="w-1/5 text-center">Maria Anders</td>
          <td className="w-1/5 text-center">Germany</td>
          <FaEdit className="w-1/5 text-center text-xl hover:text-primary" />
          <MdDeleteOutline className="w-1/5 text-center text-2xl hover:text-error" />
        </tr>
        <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark">
          <td className="w-1/5 text-center">
            Alfreds Futterkiste ljsj ljlsj lkjs j
          </td>
          <td className="w-1/5 text-center">Maria Anders</td>
          <td className="w-1/5 text-center">Germany</td>
          <FaEdit className="w-1/5 text-center text-xl hover:text-primary" />
          <MdDeleteOutline className="w-1/5 text-center text-2xl hover:text-error" />
        </tr>
      </table>
    </div>
  );
};

export default UserListView;

import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { useGetUsersQuery } from "../services";
import Loading from "./Loading";
import PopupDelete from "./PopupDelete";

const UserListView = ({ page, handlePagination }) => {
  const { data, error, isLoading } = useGetUsersQuery(page);

  console.log("data", data, error, isLoading);

  if (error) {
    return (
      <div className="w-full text-center my-4">
        <h1 className="text-error">{error.data.error}</h1>
      </div>
    );
  }

  if (data) {
    handlePagination(data.pagination);
  }

  return (
    <div className="w-full ">
      <table className="w-full flex flex-col justify-between bg-secondary mt-1 py-2 ">
        <tr className=" flex flex-row justify-between items-center   text-blue py-4 my-3  border-b">
          <th className="w-1/5 ">Name</th>
          <th className="w-1/5 ">Eamil</th>
          <th className="w-1/5 ">Role</th>
          <th className="w-1/5">Edit</th>
          <th className="w-1/5">Delete</th>
        </tr>
        {isLoading && (
          <div className=" mx-auto">
            <Loading />
          </div>
        )}
        {data?.data.map((user) => (
          <tr className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark text-sm">
            <td className="w-1/5 text-center">{user.name}</td>
            <td className="w-1/5 text-center">{user.email}</td>
            <td className="w-1/5 text-center">{user.role}</td>
            <td className="w-1/5 text-center">
              <Link className=" text-xl hover:text-primary" to="tekle">
                <FaEdit className="mx-auto" />
              </Link>
            </td>
            <td className="w-1/5 text-center">
              <PopupDelete />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UserListView;

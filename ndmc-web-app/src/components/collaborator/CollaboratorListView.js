import React from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import PopupDelete from "../PopupDelete";
import { FaEdit } from "react-icons/fa";
import {
  useDeleteCollaboratorMutation,
  useGetCollaboratorsQuery,
} from "../../services";

const CollaboratorListView = () => {
  const { data, error, isLoading } = useGetCollaboratorsQuery();
  const [deleteCollaborator] = useDeleteCollaboratorMutation();

  if (error) {
    return (
      <div className="w-full text-center my-4">
        <h1 className="text-error">
          {error.data
            ? error.data.error
            : " Error loading data. Please try again."}
        </h1>
      </div>
    );
  }

  const handleDelete = async (collaboratorId) => {
    try {
      await deleteCollaborator(collaboratorId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  console.log(data);
  return (
    <div className="w-full ">
      <table className="w-full flex flex-col justify-between bg-secondary mt-1 py-2 ">
        <tr className=" flex flex-row justify-between items-center   text-blue py-4 my-3  border-b">
          <th className="w-1/5 ">Collaborator Name</th>
          <th className="w-1/5 ">Logo Image </th>
          <th className="w-1/5">Edit</th>
          <th className="w-1/5">Delete</th>
        </tr>
        {isLoading && (
          <div className=" mx-auto">
            <Loading />
          </div>
        )}
        {data?.map((collabs) => (
          <tr
            className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark text-sm"
            key={collabs._id}
          >
            <td className="w-1/5 text-center">{collabs.name}</td>
            <td className="w-1/5 text-center">{collabs.image}</td>
            <td className="w-1/5 text-center">
              <Link className=" text-xl hover:text-primary" to={collabs._id}>
                <FaEdit className="mx-auto" />
              </Link>
            </td>
            <td className="w-1/5 text-center">
              <PopupDelete id={collabs._id} handleDelete={handleDelete} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CollaboratorListView;

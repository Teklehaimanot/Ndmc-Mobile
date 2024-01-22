import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { useDeleteNewsMutation } from "../../services";
import Loading from "../Loading";
import PopupDelete from "../PopupDelete";
import { useDebounce } from "use-debounce";
import {
  useDeleteEvidenceBriefMutation,
  useGetEvidenceBriefQuery,
} from "../../services/evidenceBriefApi";

const EvidenceBriefListView = ({ page, handlePagination, searchName }) => {
  const [debouncedValue] = useDebounce(searchName, 500);
  const { data, error, isLoading } = useGetEvidenceBriefQuery({
    page: page,
    title: debouncedValue,
  });

  const [deleteEvidenceBrief] = useDeleteEvidenceBriefMutation();

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

  const handleDelete = async (evidenceBriefId) => {
    try {
      await deleteEvidenceBrief(evidenceBriefId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="w-full ">
      <table className="w-full flex flex-col justify-between bg-secondary mt-1 py-2 ">
        <tr className=" flex flex-row justify-between items-center   text-blue py-4 my-3  border-b">
          <th className="w-1/5 ">Title</th>
          <th className="w-1/5 ">Date</th>
          <th className="w-1/5 ">Likes</th>
          <th className="w-1/5 ">Comments</th>
          <th className="w-1/5">Edit</th>
          <th className="w-1/5">Delete</th>
        </tr>
        {isLoading && (
          <div className=" mx-auto">
            <Loading />
          </div>
        )}
        {data?.data.map((evidenceBrief) => (
          <tr
            className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark text-sm"
            key={evidenceBrief._id}
          >
            <td className="w-1/5 text-center">{evidenceBrief.title}</td>
            <td className="w-1/5 text-center">{evidenceBrief.date}</td>
            <td className="w-1/5 text-center">{evidenceBrief.likes}</td>
            <td className="w-1/5 text-center">
              {evidenceBrief.comments.length}
            </td>
            <td className="w-1/5 text-center">
              <Link
                className=" text-xl hover:text-primary"
                to={evidenceBrief._id}
              >
                <FaEdit className="mx-auto" />
              </Link>
            </td>
            <td className="w-1/5 text-center">
              <PopupDelete id={evidenceBrief._id} handleDelete={handleDelete} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default EvidenceBriefListView;

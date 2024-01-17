import React from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import PopupDelete from "../PopupDelete";
import { FaEdit } from "react-icons/fa";
import { useGetNewsQuery } from "../../services";
import { useDebounce } from "use-debounce";

const NewsListView = ({ page, handlePagination, searchName }) => {
  const [debouncedValue] = useDebounce(searchName, 500);
  const { data, error, isLoading } = useGetNewsQuery({
    page: page,
    title: debouncedValue,
  });

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
        {data?.data.map((news) => (
          <tr
            className="flex flex-row justify-between items-center  my-3 py-1 border-b text-gray-dark text-sm"
            key={news._id}
          >
            <td className="w-1/5 text-center">{news.title}</td>
            <td className="w-1/5 text-center">{news.date}</td>
            <td className="w-1/5 text-center">{news.likes}</td>
            <td className="w-1/5 text-center">{news.comments.length}</td>
            <td className="w-1/5 text-center">
              <Link className=" text-xl hover:text-primary" to={news._id}>
                <FaEdit className="mx-auto" />
              </Link>
            </td>
            <td className="w-1/5 text-center">
              <PopupDelete id={news._id} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default NewsListView;

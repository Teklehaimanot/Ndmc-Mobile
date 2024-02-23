import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch } from "react-redux";
import { setCatagory } from "../state/catagory/catagorySlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCatagory({ catagory: "Dashboard" }));
  }, [dispatch]);
  return (
    <div className="w-4/5 bg-gray-light flex flex-col">
      <div
        className="flex flex-row justify-between m-5  my-10"
        style={{ height: "20vh" }}
      >
        <div className="flex bg-secondary w-1/3 border-2 border-secondary rounded-md m-1 shadow-md items-center">
          <h1 className="text-blue m-auto font-bold ">255 Active Users</h1>
        </div>
        <div className="flex bg-secondary w-1/3 border-2 border-secondary rounded-md m-1 shadow-md items-center">
          <h1 className="text-blue m-auto font-bold ">489 Data Archived</h1>
        </div>
        <div className="flex bg-secondary w-1/3 border-2 border-secondary rounded-md m-1 shadow-md items-center">
          <h1 className="text-blue m-auto font-bold ">
            632 Research Publication in Pubmed jornal
          </h1>
        </div>
      </div>
      <span className=" text-secondary bg-primary border-2"></span>
      <div
        className="flex flex-row justify-between m-5  my-10"
        style={{ height: "50vh" }}
      >
        <div className="flex bg-secondary w-1/2 border-2 border-secondary rounded-md m-1 shadow-md items-center">
          <h1 className="text-blue m-auto font-bold ">chart 1</h1>
        </div>
        <div className="flex bg-secondary w-1/2 border-2 border-secondary rounded-md m-1 shadow-md items-center">
          <h1 className="text-blue m-auto font-bold ">chart 2</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

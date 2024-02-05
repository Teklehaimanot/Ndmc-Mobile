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
    <div className="w-4/5 bg-gray-light">
      <SearchBar />
    </div>
  );
};

export default Dashboard;

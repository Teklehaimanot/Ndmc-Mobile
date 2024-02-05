import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCatagory } from "../state/catagory/catagorySlice";

const EvidenceBrief = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCatagory({ catagory: "Evidence Briefs" }));
  }, [dispatch]);
  return (
    <div className=" w-4/5 bg-gray-light ">
      <Outlet />
    </div>
  );
};

export default EvidenceBrief;

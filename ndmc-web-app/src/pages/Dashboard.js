import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch } from "react-redux";
import { setCatagory } from "../state/catagory/catagorySlice";
import {
  useGetEvidenceBriefQuery,
  useGetJornalsQuery,
  useGetUsersQuery,
} from "../services";
import Loading from "../components/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCatagory({ catagory: "Dashboard" }));
  }, [dispatch]);

  const { data, error, isLoading } = useGetUsersQuery({
    page: 1,
    name: " ",
  });
  const {
    data: researchData,
    error: researchErro,
    isLoading: researchLoading,
  } = useGetJornalsQuery({
    page: 1,
    title: " ",
  });

  const {
    data: evidenceBriefData,
    error: eivdenBriefError,
    isLoading: evidenceBriefLoading,
  } = useGetEvidenceBriefQuery({
    page: 1,
    title: " ",
  });
  console.log(evidenceBriefData);
  return (
    <div className="w-4/5 bg-gray-light flex flex-col">
      <div
        className="flex flex-row justify-between m-5  my-10"
        style={{ height: "20vh" }}
      >
        <div className="flex  bg-secondary w-1/3 border-2 border-secondary rounded-md m-1 shadow-md ">
          <div className="flex m-auto flex-col p-3 items-cente space-y-4">
            <h1 className=" text-primary  font-bold font-serif text-2xl">
              Active Mobile Users
            </h1>
            <h2 className=" text-blue text-2xl font-semibold m-auto  ">
              {isLoading ? <Loading /> : data?.pagination.count}
            </h2>
          </div>
        </div>
        <div className="flex  bg-secondary w-1/3 border-2 border-secondary rounded-md m-1 shadow-md ">
          <div className="flex m-auto flex-col p-3 items-cente space-y-4">
            <h1 className=" text-primary  font-bold font-serif text-2xl">
              Evidence Briefs | NDMC
            </h1>
            <h2 className=" text-blue text-2xl font-semibold m-auto  ">
              {evidenceBriefLoading ? (
                <Loading />
              ) : (
                evidenceBriefData.pagination.count
              )}
            </h2>
          </div>
        </div>
        <div className="flex  bg-secondary w-1/3 border-2 border-secondary rounded-md m-1 shadow-md ">
          <div className="flex m-auto flex-col p-3 items-cente space-y-4">
            <h1 className=" text-primary  font-bold font-serif text-2xl">
              Research Publication | EPHI
            </h1>
            <h2 className=" text-blue text-2xl font-semibold m-auto  ">
              {researchLoading ? <Loading /> : researchData?.totalResults}
            </h2>
          </div>
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

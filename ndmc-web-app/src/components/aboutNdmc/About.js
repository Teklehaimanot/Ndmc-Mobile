import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="overflow-y-scroll" style={{ height: "95%" }}>
      <div className="flex flex-row items-center justify-between border-b border-secondary">
        <div className="m-8 w-1/3 text-blue text-xl bg-secondary p-3 rounded shadow-md ">
          National Data Analytics and Management Center(NDMC)
        </div>
        <Link
          to="register"
          className="border-1 p-2 rounded-md bg-secondary hover:bg-primary hover:text-secondary m-8 flex flex-row justify-between items-center space-x-2 shadow"
        >
          <FaEdit />
          <button>Update</button>
        </Link>
      </div>
      <div className="flex flex-col justify-between space-y-6 mt-5 mx-5">
        <div className="flex flex-col border-1 shadow-md p-5 rounded bg-secondary">
          <div className="text-blue text-xl">Director Statement</div>
          <div className=" flex flex-row justify-between mx-10 space-x-10">
            <div>
              <h3 className="text-primary">Title:</h3>
              <p>
                National Data Management Centers for Health are institutions or
                organizations established by governments to centralize the
                management,
              </p>
            </div>
            <div>
              <h3 className="text-primary">Description:</h3>
              <p>
                National Data Management Centers for Health are institutions or
                organizations established by governments to centralize the
                management, storage, analysis, and dissemination of
                health-related data at the national level. These centers play a
                crucial role in supporting evidence-based decision-making,
                policy formulation, and monitoring the health status of the
                population.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-1 shadow-md p-5 rounded bg-secondary">
          <div className="text-blue text-xl">NDMC Strategies</div>
          <div className=" flex flex-row justify-between mx-10 space-x-10">
            <div>
              <h3 className="text-primary">Title:</h3>
              <p>
                National Data Management Centers for Health are institutions or
                organizations established by governments to centralize the
                management,
              </p>
            </div>
            <div>
              <h3 className="text-primary">Description:</h3>
              <p>
                National Data Management Centers for Health are institutions or
                organizations established by governments to centralize the
                management, storage, analysis, and dissemination of
                health-related data at the national level. These centers play a
                crucial role in supporting evidence-based decision-making,
                policy formulation, and monitoring the health status of the
                population.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-1 shadow-md p-5 rounded bg-secondary">
          <div className="text-blue text-xl">About Us</div>
          <div className=" flex flex-row justify-between mx-10 space-x-10">
            <p>
              National Data Management Centers for Health are institutions or
              organizations established by governments to centralize the
              management, storage, analysis, and dissemination of health-related
              data at the national level. These centers play a crucial ro
            </p>
          </div>
        </div>
        <div className="flex flex-col border-1 shadow-md p-5 rounded bg-secondary">
          <div className="text-blue text-xl">Vision</div>
          <div className=" flex flex-row justify-between mx-10 space-x-10">
            <p>
              National Data Management Centers for Health are institutions or
              organizations established by governments to centralize the
              management, storage, analysis, and dissemination of health-related
              data at the national level. These centers play a crucial ro
            </p>
          </div>
        </div>
        <div className="flex flex-col border-1 shadow-md p-5 rounded bg-secondary">
          <div className="text-blue text-xl">Mission</div>
          <div className=" flex flex-row justify-between mx-10 space-x-10">
            <p>
              National Data Management Centers for Health are institutions or
              organizations established by governments to centralize the
              management, storage, analysis, and dissemination of health-related
              data at the national level. These centers play a crucial ro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import Header from "../components/Header";
import {
  FaRegUser,
  FaRegNewspaper,
  FaResearchgate,
  FaRegHandshake,
} from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <div className="h-full flex flex-row justify-between">
        <div className="w-1/5 bg-blue-dark">
          <ul className="space-y-6 py-5 px-2 w-2/3">
            <Link
              to="/"
              className="p-2 text-secondary border rounded text-center hover:bg-primary flex flex-row items-center space-x-3"
            >
              <FaRegUser />
              <h3> Dashboard </h3>
            </Link>
            <Link
              to="/user"
              className="p-2 text-secondary border rounded text-center hover:bg-primary flex flex-row items-center space-x-3"
            >
              <FaRegUser />
              <h3> User Management</h3>
            </Link>
            <li className="p-2 text-secondary border rounded text-center hover:bg-primary flex flex-row items-center space-x-3">
              <FaRegNewspaper />
              <h3>News and Events</h3>
            </li>
            <li className="p-2 text-secondary border rounded text-center hover:bg-primary flex flex-row items-center space-x-3">
              <FaResearchgate />
              <h3>Evidence Briefs</h3>
            </li>
            <li className="p-2 text-secondary border rounded text-center hover:bg-primary flex flex-row items-center space-x-3">
              <FaUsersRays />
              <h3> About NDMC</h3>
            </li>
            <li className="p-2 text-secondary border rounded text-center hover:bg-primary flex flex-row items-center space-x-3">
              <FaRegHandshake />
              <h3> Collaborators</h3>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;

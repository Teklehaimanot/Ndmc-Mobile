import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const MainContainer = () => {
  return (
    <div className="h-full flex flex-row ">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainContainer;

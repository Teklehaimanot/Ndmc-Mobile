import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(logout());

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };
  return (
    <div className="flex flex-row justify-between bg-primary text-secondary py-4 items-center border-b border-black shadow-md">
      <div className="mx-5">NDMC - {user.role.toUpperCase()}</div>
      <div className="flex flex-row w-1/2 justify-end items-center space-x-8 mx-5">
        <div className="text-xl">{user.name}</div>
        <button
          className="border rounded p-1 hover:bg-blue"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;

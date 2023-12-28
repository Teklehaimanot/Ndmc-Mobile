import { useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import { setCatagory } from "../state/catagory/catagorySlice";
import { useEffect } from "react";

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCatagory({ catagory: "User Management" }));
  }, [dispatch]);
  return (
    <div className="w-4/5 bg-gray-light">
      <SearchBar />
    </div>
  );
};

export default User;

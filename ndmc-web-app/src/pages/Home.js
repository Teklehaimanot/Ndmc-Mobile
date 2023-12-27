import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return <div>{auth.user?.email} teki</div>;
};
export default Home;

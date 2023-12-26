import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };
  return (
    <div className="w-1/2 mx-auto space-y-4">
      <span className="text-bold text-3xl text-primary mb-8">Login</span>
      <form className="flex flex-col space-y-7" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="submit"
          value="Log In"
          className="p-4  placeholder-gray rounded bg-primary text-secondary text-lg text-bold"
        />
      </form>
      <div className="flex flex-row justify-between mx-3">
        <span className="text-bold text-xl">New user?</span>
        <Link to="/auth/signup">
          <span className="text-bold text-xl text-blue">Create an account</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;

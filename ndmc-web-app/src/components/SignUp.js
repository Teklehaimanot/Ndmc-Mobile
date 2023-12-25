import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/auth/verify");
  };

  return (
    <div className="w-1/2 mx-auto space-y-4">
      <span className="text-bold text-3xl mb-8">Create Account</span>
      <form className="flex flex-col space-y-7" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="text"
          placeholder="Phone No"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 border-2 placeholder-gray rounded"
        />
        <input
          type="submit"
          value="Create Account"
          className="p-5  placeholder-gray rounded bg-gray-dark text-yellow text-lg text-bold"
        />
      </form>
      <div className="flex flex-row justify-between mx-3">
        <span className="text-bold text-xl">Have an Account?</span>
        <Link to="/auth">
          <span className="text-bold text-xl text-blue">Log in</span>
        </Link>
      </div>
      <div className="text-sm text-gray my-4">
        By clicking “sign in”, on behalf of myself an the practice, I agree to
        the SimplePractice Terms of Service an Privacy policy.
      </div>
    </div>
  );
};

export default SignUp;
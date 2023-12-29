import React from "react";

const UserRegister = () => {
  return (
    <div className="w-1/3 m-auto flex flex-col space-y-5 h-2/3 justify-center">
      <div className="text-error">Error message</div>
      <div className="text-blue">Create a user</div>
      <form className="flex flex-col space-y-5">
        <input
          type="text"
          placeholder="Name"
          className="p-3  placeholder-gray rounded"
          onChange={""}
          value={""}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3  placeholder-gray rounded"
          onChange={""}
          value={""}
        />
        <select className="p-3  placeholder-gray rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          className="p-3  placeholder-gray rounded"
          onChange={""}
          value={""}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="p-3  placeholder-gray rounded"
          onChange={""}
          value={""}
        />
        <input
          type="submit"
          value={"isloading" ? "Create" : ".... loading"}
          className="p-3  placeholder-gray rounded bg-primary text-secondary text-lg text-bold"
        />
      </form>
    </div>
  );
};

export default UserRegister;

import React, { useState } from "react";
import { useCreateUserMutation } from "../services";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
  });
  const [createUser, { isLoading, data, isSuccess, isError, error }] =
    useCreateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const newUser = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      createUser(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div className="bg-primary">Loading...</div>;
  }

  if (isError) {
    const errors = error?.data?.error || "An error occurred.";
    return (
      <div className=" text-error h-full text-center">
        <div className="bg-secondary p-10 m-auto text-2xl"> {errors}</div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className=" text-primary h-full text-center">
        <div className="bg-secondary p-10 m-auto text-2xl">
          User {formData.name} is successfully created
        </div>
      </div>
    );
  }

  console.log("dd", data);
  return (
    <div className="w-1/3 m-auto flex flex-col space-y-5 h-2/3 justify-center">
      <div className="text-blue">Create a user</div>
      <form className="flex flex-col space-y-5" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="p-3  placeholder-gray rounded"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3  placeholder-gray rounded"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <select className="p-3  placeholder-gray rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          className="p-3  placeholder-gray rounded"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="p-3  placeholder-gray rounded"
          onChange={handleChange}
          name="confirmPassword"
          value={formData.confirmPassword}
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

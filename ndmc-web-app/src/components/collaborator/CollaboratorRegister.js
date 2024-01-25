import React, { useState } from "react";
import { useCreateCollaboratorMutation } from "../../services";
import Loading from "../Loading";

const CollaboratorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [createCollaborator, { isLoading, data, isSuccess, isError, error }] =
    useCreateCollaboratorMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      const newData = new FormData();
      newData.append("name", formData.name);
      newData.append("image", formData.image);
      createCollaborator(newData);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div className="w-1/3 m-auto flex flex-col space-y-5 h-2/3 justify-center  bg-transparent">
        <div className=" p-10 m-auto text-2xl">
          <Loading />
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className=" text-primary h-full text-center">
        <div className="bg-secondary p-10 m-auto text-2xl shadow-lg">
          Collaborator {data.name} is successfully created
        </div>
      </div>
    );
  }
  return (
    <div
      className="w-1/3 m-auto flex flex-col space-y-5 h-2/3 justify-center overflow-y-scroll "
      style={{ height: "90%" }}
    >
      {isError && (
        <div className=" text-error">
          {error?.data?.error || "An error occured"}
        </div>
      )}
      <div className="text-blue">Create a Collaborator</div>
      <form className="flex flex-col space-y-5" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Collaborator name"
          className="p-3  placeholder-gray rounded"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <div className="p-3  placeholder-gray rounded bg-secondary flex flex-col">
          <span className="text-primary mb-2">Upload Image</span>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <input
          type="submit"
          value={!isLoading ? "Create" : ".... loading"}
          className="p-3  placeholder-gray rounded bg-primary text-secondary text-lg text-bold"
        />
      </form>
    </div>
  );
};

export default CollaboratorRegister;

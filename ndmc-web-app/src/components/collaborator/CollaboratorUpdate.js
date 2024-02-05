import React, { useState, useEffect } from "react";
import { useUpdateCollaboratorMutation } from "../../services";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import axios from "axios";

const CollaboratorUpdate = () => {
  const { collaboratorId } = useParams();
  console.log(collaboratorId);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const basicUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const result = await axios.get(
          `${basicUrl}/collaborator/${collaboratorId}`
        );
        const newsData = result.data;

        setFormData({
          ...formData,
          name: newsData.name,
        });
      } catch (error) {
        console.error("Error fetching news data", error);
      }
    };

    fetchNews();
  }, [collaboratorId]);

  const [updateCollaborator, { isLoading, data, isSuccess, isError, error }] =
    useUpdateCollaboratorMutation();

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
      const updatedCollaboratorData = new FormData();
      updatedCollaboratorData.append("name", formData.name);
      updatedCollaboratorData.append("image", formData.image);
      updateCollaborator({ collaboratorId, updatedCollaboratorData });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div
        className="w-1/3 m-auto flex flex-col space-y-5 h-2/3 justify-center overflow-y-scroll "
        style={{ height: "90%" }}
      >
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
          Collaborator {data.name} is successfully updated
        </div>
      </div>
    );
  }
  return (
    <div className="w-1/3 m-auto flex flex-col space-y-5 h-2/3 justify-center">
      {isError && (
        <div className=" text-error">
          {error?.data?.error || "An error occured"}
        </div>
      )}
      <div className="text-blue">Update Collaborator</div>
      <form className="flex flex-col space-y-5" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Collaborator Name"
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
          />
        </div>
        <input
          type="submit"
          value={!isLoading ? "Save" : ".... loading"}
          className="p-3  placeholder-gray rounded bg-primary text-secondary text-lg text-bold"
        />
      </form>
    </div>
  );
};

export default CollaboratorUpdate;

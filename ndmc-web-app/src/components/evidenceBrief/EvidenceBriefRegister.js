import React, { useState } from "react";
import { useCreateEvidenceBriefMutation } from "../../services";
import Loading from "../Loading";

const EvidenceBriefRegister = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    pdf: null,
  });
  const [createNews, { isLoading, data, isSuccess, isError, error }] =
    useCreateEvidenceBriefMutation();

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
      newData.append("title", formData.title);
      newData.append("description", formData.description);
      newData.append("date", formData.date);
      newData.append("image", formData.image);
      newData.append("pdf", formData.pdf);
      createNews(newData);
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
          Evidence Brief {data.title} is successfully created
        </div>
      </div>
    );
  }
  console.log("fd", formData);
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
      <div className="text-blue">Create Evidence Brief</div>
      <form className="flex flex-col space-y-5" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="p-3  placeholder-gray rounded"
          name="title"
          onChange={handleChange}
          value={formData.title}
          required
        />
        <textarea
          placeholder="Compose a paragraph to serve as a description."
          className="p-3 placeholder-gray rounded "
          onChange={handleChange}
          name="description"
          value={formData.description}
          required
        />
        <input
          type="date"
          className="p-3  placeholder-gray rounded"
          onChange={handleChange}
          name="date"
          value={formData.date}
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
        <div className="p-3  placeholder-gray rounded bg-secondary flex flex-col">
          <span className="text-primary mb-2">Upload Pdf</span>
          <input
            type="file"
            name="pdf"
            onChange={handleChange}
            accept=".pdf"
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

export default EvidenceBriefRegister;

import React, { useState, useEffect } from "react";
import { useUpdateEvidenceBriefMutation } from "../../services";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import axios from "axios";

const EvidenceBriefUpdate = () => {
  const { evidenceBriefId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    pdf: null,
  });
  const basicUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchEvidenceBrief = async () => {
      try {
        const result = await axios.get(
          `${basicUrl}/evidenceBrief/${evidenceBriefId}`
        );
        const evidenceBriefData = result.data;

        setFormData({
          ...formData,
          title: evidenceBriefData.title,
          description: evidenceBriefData.description,
          date: evidenceBriefData.date,
        });
      } catch (error) {
        console.error("Error fetching evidence brief data", error);
      }
    };

    fetchEvidenceBrief();
  }, [evidenceBriefId]);

  const [updateEvidenceBrief, { isLoading, data, isSuccess, isError, error }] =
    useUpdateEvidenceBriefMutation();

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
      const updatedEvidenceBriefData = new FormData();
      updatedEvidenceBriefData.append("title", formData.title);
      updatedEvidenceBriefData.append("description", formData.description);
      updatedEvidenceBriefData.append("date", formData.date);
      updatedEvidenceBriefData.append("image", formData.image);
      updatedEvidenceBriefData.append("pdf", formData.pdf);
      updateEvidenceBrief({ evidenceBriefId, updatedEvidenceBriefData });
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
          Evidence Brief {data.title} is successfully updated
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
      <div className="text-blue">Update Evidence Brief</div>
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
        <div className="p-3  placeholder-gray rounded bg-secondary flex flex-col">
          <span className="text-primary mb-2">Upload Pdf</span>
          <input type="file" name="pdf" onChange={handleChange} accept=".pdf" />
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

export default EvidenceBriefUpdate;

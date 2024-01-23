import React from "react";

const AboutUpdate = () => {
  return (
    <div
      className="w-2/3 m-auto flex flex-col space-y-5 my-5 justify-center overflow-y-scroll "
      style={{ height: "95%" }}
    >
      {/* {isError && (
        <div className=" text-error">
          {error?.data?.error || "An error occured"}
        </div>
      )} */}
      <div className="text-blue">Update About Ndmc Contents</div>
      <form className="flex flex-col space-y-5" onSubmit={""}>
        <div className="flex flex-col space-y-3">
          <h3>Driector Statement</h3>
          <input
            type="text"
            placeholder="Title"
            className="p-3  placeholder-gray rounded"
            name="title"
            required
          />
          <textarea
            placeholder="Description."
            className="p-3 placeholder-gray rounded "
            name="description"
            required
          />
        </div>
        <div className="flex flex-col space-y-3">
          <h3>Strategies</h3>
          <input
            type="text"
            placeholder="Title"
            className="p-3  placeholder-gray rounded"
            name="title"
            required
          />
          <textarea
            placeholder="Description."
            className="p-3 placeholder-gray rounded "
            name="description"
            required
          />
        </div>

        <div className="flex flex-col space-y-3">
          <h3>About us, Vision, Mission</h3>
          <input
            type="text"
            placeholder="About us"
            className="p-3  placeholder-gray rounded"
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Vision"
            className="p-3  placeholder-gray rounded"
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Mission"
            className="p-3  placeholder-gray rounded"
            name="title"
            required
          />
        </div>
        <input
          type="submit"
          value={!"isLoading" ? "Save" : ".... loading"}
          className="p-3  placeholder-gray rounded bg-primary text-secondary text-lg text-bold"
        />
      </form>
    </div>
  );
};

export default AboutUpdate;

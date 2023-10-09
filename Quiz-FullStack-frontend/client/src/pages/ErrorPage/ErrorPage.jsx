import React from "react";
import error from "../../assets/page_not_found.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="w-[40%] h-[40%] mb-5">
        <img src={error} alt="error" className="w-full h-full object-contain" />
      </div>
      <p className="text-3xl mb-4 text-[#FF4C68]">
        Woops!! Looks like this page doesn't exist
      </p>
      <div className="flex justify-between md:w-1/3 text-xl">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="m-5 p-2 navBtn  text-white rounded-lg bg-[#FF4C68]"
        >
          Go Back
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="m-5 p-2 navBtn  text-white rounded-lg bg-[#FF4C68]"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

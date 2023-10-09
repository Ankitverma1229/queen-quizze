import React from "react";
import failureIcon from "../../assets/result_icon/failure.png";
import { useNavigate } from "react-router-dom";

const FailureScreen = (props) => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="w-full md:w-[55%] lg:w-[45%] xl:w-[35%] flex flex-col justify-center items-center bg-white py-24 rounded-md">
      <div>
        <img src={failureIcon} alt="failure" className="bg-white" />
      </div>
      <p className="font-[Public Sans] font-semibold text-[1.8rem] md:text-[2.5rem] bg-white mt-10">
        Bad Luck
      </p>
      <span className="font-[Public Sans] mt-2 font-semibold text-base text-[#586879] bg-white">
        You have failed
      </span>
      <div className="bg-[#E5F0E9] text-[#31A05D] font-bold text-[1.5rem] font-[Public Sans] py-4 px-6 rounded-md my-7 border-[1px] border-[#BFD1C6]">
        {props.score}/{props.totalMarks}
      </div>
      <button
        onClick={handleBackToHome}
        className="text-[#31A05D] text-base font-semibold font-[Public Sans] bg-white hover:scale-[1.2] hover:underline hover:text-[#377EF9]"
      >
        Back to Home
      </button>
    </div>
  );
};

export default FailureScreen;

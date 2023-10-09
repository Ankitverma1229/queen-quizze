import React from "react";
import { VscChevronRight } from "react-icons/vsc";

const PageTab = (props) => {
  const activePage = props.activePage;

  return (
    <div className="page-options flex flex-col items-center gap-10 m-10 md:flex-row">
      <div className={`flex justify-between `}>
        <div className="flex items-center gap-4 me-10 lg:me-20">
          <span
            className={`py-1 px-3 rounded-full ${
              activePage >= 1
                ? "bg-[#2DAF61] text-white "
                : "bg-[#DADBE2] text-black"
            }`}
          >
            1
          </span>
          <p className=" text-lg lg:text-xl text-[#414A53] font-[600] font-publicSans">
            Add Video
          </p>
        </div>
        <span className="flex items-center">
          <VscChevronRight size={"1.5rem"} color={"#747D83"} />
        </span>
      </div>
      <div className={`flex justify-between`}>
        <div className="flex items-center gap-4 me-5 md:me-10 lg:me-20">
          <span
            className={`py-1 px-3 rounded-full ${
              activePage >= 2
                ? "bg-[#2DAF61] text-white"
                : "bg-[#DADBE2] text-black"
            }`}
          >
            2
          </span>
          <p className="text-lg lg:text-xl text-[#414A53] font-[600] font-publicSans">
            Create Quiz
          </p>
        </div>
        <span className="flex items-center">
          <VscChevronRight size={"1.5rem"} color={"#747D83"} />
        </span>
      </div>
      <div className={`flex justify-between `}>
        <div className="flex items-center gap-4 me-7 md:me-0">
          <span
            className={`py-1 px-3 rounded-full ${
              activePage >= 3
                ? "bg-[#2DAF61] text-white"
                : "bg-[#DADBE2] text-black"
            }`}
          >
            3
          </span>
          <p className="text-lg lg:text-xl text-[#414A53] font-[600] font-publicSans">
            Add Question
          </p>
        </div>
      </div>
    </div>
  );
};
export default PageTab;

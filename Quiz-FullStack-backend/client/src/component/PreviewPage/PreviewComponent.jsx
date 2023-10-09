import React, { useState } from "react";
import Options from "./Options.jsx";

const PreviewComponent = ({
  id,
  options,
  questionData,
  correctAnswer,
  currentPage,
}) => {
  const [allOptions, setAllOptions] = useState(options || []);
  const startingQuestionNumber = (currentPage - 1) * 5 + id + 1;
  return (
    <div>
      <div className="text-[#85909B]">
        <p className="text-lg">
          <span>{startingQuestionNumber}</span> Question
        </p>
      </div>
      <div className="bg-[#F7F8FB] border rounded-lg md:px-7 py-5 mt-2 px-2">
        <div className="flex flex-col lg:flex-row justify-between">
          <p className="text-[#21262C] font-bold md:text-xl">
            {questionData.question}
          </p>
          <p className="text-[#414A53] font-light flex md:justify-end lg:justify-start gap-2 items-center mt-2 lg:mt-0">
            Mark:
            <span className="text-green font-semibold md:text-lg">
              {questionData.marks}
            </span>
          </p>
        </div>
        <div className="lg:mt-5 flex flex-col xl:flex-row flex-wrap w-[90%] justify-between items-start xl:gap-5">
          {allOptions.map((optionTitle, index) => (
            <Options
              key={index}
              {...optionTitle}
              id={index + 1}
              correctAnswer={correctAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;

import React, { useEffect, useState } from "react";
import "./Options.scss";

const Options = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const id = parseInt(props.id);
    const correctAnswer = parseInt(props.correctAnswer);

    if (id === correctAnswer) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [props.id, props.correctAnswer, isChecked]);

  return (
    <div>
      <div className="w-[100%] flex flex-col">
        <div className="flex gap-3 items-center w-[100%]">
          <input
            type="radio"
            name={`option_${props._id}`}
            id={`option_${props._id}`}
            className="w-5 h-10 accent-[#31A05D] cursor-pointer"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
          />
          <label
            htmlFor={`option_${props._id}`}
            className="text-[#586879] md:text-lg cursor-pointer w-52 md:w-80 xl:w-96 overflow-x-scroll whitespace-no-wrap"
          >
            {props.optionTitle}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Options;

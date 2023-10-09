import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./CreateOption.scss";

const CreateOption = (props) => {
  const isSelect = (id) => {
    props.onSelectOption(id + 1);
  };
  return (
    <div className="flex cursor-pointer items-center justify-between px-5 border-solid border-2 rounded-lg py-2 w-[100%] md:w-[20.5rem] lg:w-[23.5rem]">
      <div className="flex items-center space-x-2 ">
        <input
          type="radio"
          className="w-5 cursor-pointer h-4 accent-[#31A05D]"
          name="option"
          onChange={() => isSelect(props.id)}
        />
        <p className="text-[#85909B] text-xl md:text-lg cursor-pointer w-[10rem] md:w-[14rem] lg:w-[17rem] overflow-x-scroll whitespace-no-wrap">
          {props.option.optionTitle}
        </p>
      </div>
      <RxCross2
        className="text-[#85909B]"
        onClick={() => {
          props.onDeleteOption(props.id);
        }}
      />
    </div>
  );
};

export default CreateOption;

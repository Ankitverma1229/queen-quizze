import React from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

function Categories(props) {
  function handleDeleteCategory() {
    axios
      .delete(`http://localhost:6500/api/admin/videoCategories/${props._id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    props.onSelect(props.id);
  }

  return (
    <div className="bg-[#F7F8FB] flex md:mx-3 my-2 items-center justify-between px-5 border-solid border-2 rounded-lg py-2 w-[100%] md:w-[17.5rem] ">
      <div className="flex items-center w-[14rem] overflow-x-scroll">
        <p className="text-[#21262C] text-xl ">{props.category}</p>
      </div>
      <RxCross2
        className="text-[#85909B] text-2xl cursor-pointer"
        onClick={handleDeleteCategory}
      />
    </div>
  );
}
export default Categories;

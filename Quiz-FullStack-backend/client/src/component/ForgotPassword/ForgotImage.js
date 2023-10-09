import React from "react";
import girlImage from "../../assets/forgotPassword/girl_image.png";

const ForgotImage = () => {
  return (
    <div className="w-[100%]  md:w-[50%] h-[50%] md:h-[100%]">
      <img
        src={girlImage}
        alt="Girl image"
        className="w-[100%] h-[100%] object-fit-md-cover object-md-center rounded-tr-lg rounded-br-lg"
      />
    </div>
  );
};

export default ForgotImage;

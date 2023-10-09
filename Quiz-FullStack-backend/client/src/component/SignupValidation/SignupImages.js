import React from "react";
import girl from "../../assets/signup/signup_left.png";

function Signup_images() {
  return (
    <div className=" w-[100%] md:w-[50%] hidden md:block">
      <img src={girl} alt="SignUp" className="h-[100%] w-[100%] md:w-[95%]" />
    </div>
  );
}

export default Signup_images;

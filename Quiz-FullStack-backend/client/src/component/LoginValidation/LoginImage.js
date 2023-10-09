import React from "react";
import loginImg from "../../assets/login/login_left_image.png";

const LoginImage = () => {
  return (
    <div className="w-[50%]  hidden md:block">
      <img
        src={loginImg}
        alt="LogIn"
        className="w-[100%] h-[100%] object-fit-md-cover object-md-center"
      />
    </div>
  );
};

export default LoginImage;

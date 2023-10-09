import React from "react";
import SignupForm from "../../component/SignupValidation/SignupForm.jsx";
import SignupImages from "../../component/SignupValidation/SignupImages.js";

const Signup = () => {
  return (
    <div className=" md:w-[100vw] md:flex justify-center items-center mx-auto min-h-[90vh] xxl:h-[100vh] my-10">
      <div className="flex min-h-[60%] md:min-h-[70%] lg:h-[90%] bg-white lg:w-[85vw] xl:w-[80vw] mx-auto rounded-xl">
        <SignupImages />
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;

import React from "react";
import ForgotForm from "../../component/ForgotPassword/ForgotForm";
import ForgotImage from "../../component/ForgotPassword/ForgotImage";
const ForgotPassword = () => {
  return (
    <section className="Login-section  flex justify-center items-center md:w-[100vw] min-h-[96vh] xl:h-[90vh]">
      <div className="flex flex-col bg-white  h-[100%] md:h-[80%] lg:h-[90%] lg:w-[85vw] xl:w-[70vw] xl:h-[85%] mx-auto  rounded-xl md:flex-row">
        <ForgotImage />
        <ForgotForm />
      </div>
    </section>
  );
};

export default ForgotPassword;

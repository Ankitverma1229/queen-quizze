import React from "react";
import CreatePasswordImage from "../../component/ForgotPassword/CreatePasswordImage";
import CreateNewPasswordForm from "../../component/ForgotPassword/CreateNewPasswordForm";

const CreateNewPassword = () => {
  return (
    <section className="Login-section  flex justify-center items-center md:w-[100vw] md:min-h-[100vh]">
      <div className="flex flex-col bg-white  h-[100%] md:h-[85%] lg:h-[90%] lg:w-[85vw] xl:w-[70vw] xl:h-[85%] mx-auto rounded-xl md:flex-row">
        <CreatePasswordImage />
        <CreateNewPasswordForm />
      </div>
    </section>
  );
};

export default CreateNewPassword;

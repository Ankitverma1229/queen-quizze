import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";
import ForgotImage from "../../components/ForgotPassword/ForgotImage.js";

const ForgotPassword = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    setAdminEmail(e.target.value);
    setEmailError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    const trimmedEmail = adminEmail.trim();

    if (!trimmedEmail) {
      alert("Please enter your email");
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:6500/api/admin/forgotPassword",
          { email: trimmedEmail }
        );

        if (response.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        setMessage(true);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User is not valid!!",
        });
      }
    }
  };

  return (
    <section className="Login-section  flex justify-center items-center md:w-[100vw] min-h-[96vh] xl:h-[90vh]">
      <div className="flex flex-col bg-white  h-[100%] md:h-[80%] lg:h-[90%] lg:w-[85vw] xl:w-[70vw] xl:h-[85%] mx-auto  rounded-xl md:flex-row">
        <ForgotImage />
        <div className="md:w-[50%]">
          <div className="login-form-container p-3 mt-5 md:p-10 xl:p-16 md:mt-0">
            <div className="page-title flex justify-center items-center gap-2 md:gap-3 lg:justify-start">
              <p className="text-[1.2rem] text-[#414A53] font-Public Sans md:text-[1.5rem]">
                <span className="text-[#2DAF61] text-[1.5rem] font-[500] font-[Public Sans] md:text-[1.8rem]">
                  Queen
                </span>{" "}
                quizzie
              </p>
              <span className="text-lightGrey text-3xl font-extralight">|</span>
              <p className="font-[700] text-[#414A53] text-[1rem] pt-1 font-publicSans">
                ONLINE QUIZ
              </p>
            </div>
            <div className="page-heading flex flex-col items-center gap-5 mt-5 md:mt-10 md:items-start">
              <h1 className=" text-xl lg:text-3xl  font-[700] text-[#414A53] font-publicSans">
                Forgot Password
              </h1>
              <p className="style-[Public Sans] text-[#21262C] text-base mt-2 lg:text-lg text-center md:text-start font-publicSans">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>

            <form
              method="POST"
              onSubmit={handleSendLink}
              className="mt-5 md:mt-10"
            >
              {message ? (
                <p className="text-[#31A05D] font-bold text-base font-publicSans">
                  Password reset link send successfully in your email
                </p>
              ) : (
                ""
              )}

              <div className="flex flex-col my-5">
                <label
                  htmlFor="email"
                  className="font-[500] text-[#85909B] text-base py-2 font-publicSans"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 rounded-lg text-base md:text-xl focus: outline-none md:py-3 md:px-4 ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="flex justify-center md:justify-end ">
                <Button
                  type="submit"
                  className="py-4 px-8 md:mt-5 text-white bg-[#31A05D] rounded-lg text-[1rem] font-[500] md:py-3 lg:px-10 font-publicSans"
                  variant="gradient"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

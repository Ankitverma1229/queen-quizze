import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Button } from "@material-tailwind/react";

const ResetForm = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfrmPassword, setShowCnfrmPassword] = useState(false);

  const adminValidate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6500/api/admin/resetPassword/${id}/${token}`
      );

      if (response.status === 201) {
        Swal.fire("User is valid", "You clicked the button!", "success");
      } else {
        navigate("*");
      }
    } catch (error) {
      console.log(error);
      navigate("*");
    }
  };

  useEffect(() => {
    adminValidate();
  }, []);

  const setValue = (e) => {
    setPassword(e.target.value);
    validatePasswordStrength(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCnfrmPasswordVisibility = () => {
    setShowCnfrmPassword(!showCnfrmPassword);
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
    setIsStrongPassword(strongPasswordRegex.test(password));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) {
      Swal.fire("Fields are empty?", "Both fields are required", "question");
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
    } else if (!isStrongPassword) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and include letters, special characters and numbers.",
      });
    } else {
      try {
        const response = await axios.post(
          `http://localhost:6500/api/admin/updatePassword/${id}/${token}`,
          { password: password }
        );

        if (response.status === 201) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Password successfully updated",
            showConfirmButton: false,
            timer: 1500,
          });
          setMessage(true);
          setPassword("");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Token Expired generete new Link",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("*");
        }, 1500);
      }
    }
  };
  return (
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
        <div className="page-heading flex flex-col items-center gap-5 mt-10 md:mt-7 md:items-start">
          <h1 className=" text-xl lg:text-3xl  font-[700] text-[#414A53] font-publicSans">
            Create New Password
          </h1>
          <p className="style-[Public Sans] text-[#21262C] text-base lg:text-lg text-center my-5 md:my-0 md:text-start font-publicSans">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
        <form method="POST" onSubmit={handleUpdatePassword} className="mt-6">
          {message ? (
            <p className="text-[#31A05D] font-bold text-base font-publicSans">
              Password successfully updated
            </p>
          ) : (
            ""
          )}
          <div className="flex flex-col my-5">
            <div className="flex justify-between py-2">
              <label
                htmlFor="newPassword"
                className="font-[500] text-[#85909B] text-base font-publicSans"
              >
                New Password
              </label>
            </div>
            <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                className=" py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                autoComplete="off"
                onChange={setValue}
              />
              <div
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BsEyeSlash size={"2rem"} color={"#747D83"} />
                ) : (
                  <BsEye size={"2rem"} color={"#747D83"} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col my-5">
            <div className="flex justify-between py-2">
              <label
                htmlFor="confirmPassword"
                className="font-[500] text-[#85909B] text-base font-publicSans"
              >
                Confirm Password
              </label>
            </div>
            <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
              <input
                type={showCnfrmPassword ? "text" : "password"}
                className=" py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter your confirm password"
                autoComplete="off"
                onChange={handleConfirmPassword}
              />
              <div
                className="cursor-pointer"
                onClick={toggleCnfrmPasswordVisibility}
              >
                {showCnfrmPassword ? (
                  <BsEyeSlash size={"2rem"} color={"#747D83"} />
                ) : (
                  <BsEye size={"2rem"} color={"#747D83"} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-end mt-16  md:flex-row md:mt-10">
            <Button
              type="submit"
              variant="gradient"
              className={`py-4 px-8 text-white ${
                isStrongPassword ? "bg-green" : "bg-gray-700"
              } rounded-lg text-[1rem] lg:text-[1.2rem] font-[500] md:py-3 md:px-10 font-publicSans`}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetForm;

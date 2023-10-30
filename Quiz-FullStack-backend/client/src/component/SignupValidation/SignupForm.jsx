import React, { useState } from "react";
import Validation from "./Validation.js";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Button } from "@material-tailwind/react";

function SignupForm() {
  const data = { name: "", email: "", password: "", confirmPassword: "" };
  const [user, setUser] = useState(data);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfrmPAssword, setShowCnfrmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  let name, value;

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCnfrmPasswordVisibility = () => {
    setShowCnfrmPassword(!showCnfrmPAssword);
  };

  function handleValidation(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = user;
    const validationErrors = Validation(user);
    setErrors(validationErrors);

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      Object.keys(validationErrors).length > 0
    ) {
      Swal.fire(
        "Validation Error",
        "Please fill all fields correctly",
        "error"
      );
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/register`, user)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
          });
        });
    }
  }

  return (
    <div className="signup-form  md:w-[50%] md:ps-10  text-center md:text-start mt-0 md:mt-10">
      <div className="flex items-center justify-evenly md:justify-start md:gap-4  border-black mt-6">
        <p className="text-grey text-2xl font-publicSan font-[400]">
          <span className="text-green font-bold">Queen </span>quizzie
        </p>
        <span className="text-lightGrey text-3xl font-extralight">|</span>
        <p className="text-grey font-publicSans pt-2 font-[700]">ONLINE QUIZ</p>
      </div>

      <div className="mt-4  lg:mt-6 xl:mt-10  flex flex-col gap-4 mx-5 md:mx-0">
        <h2 className="text-grey font-publicSans  font-bold text-xl lg:text-3xl ">
          Sign Up
        </h2>
        <p className="text-sm lg:text-lg md:w-[80%] text-[#21262C] mx-auto md:mx-0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="mt-3 xl:mt-10 md:w-[85%] lg:w-[90%] text-start px-3 md:px-0">
        <form
          method="POST"
          className=" space-y-4 xl:space-y-7"
          onSubmit={handleValidation}
        >
          <div>
            <label htmlFor="name" className="text-[#85909B] text-base">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="md:w-full  w-[100%] mt-1 rounded-lg p-2 bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] text-base md:text-xl focus:outline-none md:py-3 md:px-4"
              placeholder="Enter your name"
              onChange={inputHandler}
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div className="">
            <label htmlFor="email" className="text-[#85909B] w-full">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 rounded-lg p-2 md:w-full  w-[100%] bg-[#F7F8FB] focus:outline-none border-solid border-2 border-[#E2E3E8] text-base md:text-xl md:py-3 md:px-4"
              placeholder="Enter your email address"
              onChange={inputHandler}
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div className="">
            <label htmlFor="password" className="text-[#85909B] ">
              Password
            </label>
            <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="mt-1  py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                placeholder="Enter your password"
                onChange={inputHandler}
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

            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="">
            <label htmlFor="confirmPassword" className="text-[#85909B] ">
              Confirm Password
            </label>
            <div className="  md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
              <input
                type={showCnfrmPAssword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="mt-1  py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                placeholder="Enter your confirm password"
                onChange={inputHandler}
              />
              <div
                className="cursor-pointer"
                onClick={toggleCnfrmPasswordVisibility}
              >
                {showCnfrmPAssword ? (
                  <BsEyeSlash size={"2rem"} color={"#747D83"} />
                ) : (
                  <BsEye size={"2rem"} color={"#747D83"} />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex justify-center md:justify-end pb-2">
            <Button
              type="submit"
              className="bg-green w-[90%] md:w-[40%] xl:w-[25%] text-[1rem] md:py-4 md:px-5 py-3 text-white rounded"
              variant="gradient"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className="flex justify-center ">
          <Link
            to={"/"}
            className="text-[#85909B] font-publicSans my-10 text-base"
          >
            Already have an account?
            <span className="text-[#2DAF61] hover:underline hover:cursor-pointer">
              {" "}
              Login In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

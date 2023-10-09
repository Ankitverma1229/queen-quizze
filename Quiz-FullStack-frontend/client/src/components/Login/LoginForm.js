import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Button } from "@material-tailwind/react";


const LoginForm = () => {
  const loginData = { email: "", password: "", name: "" };
  const [inputLoginData, setInputLoginData] = useState(loginData);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let token = "";

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    let login = localStorage.getItem('loginToken');

    if (storedToken) {
      try {
        let decoded = JSON.parse(window.atob(storedToken.split('.')[1]));
        setInputLoginData({
          email: decoded.email || "",
          password: decoded.password || "",
        });
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    }

    if (login) {
      navigate('/');
    }

  }, []);

  const handleLoginData = (e) => {
    setInputLoginData({ ...inputLoginData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputLoginData;

    if (email && password) {
      try {
        const response = await axios.post(
          "http://localhost:6500/api/admin/login",
          inputLoginData
        );

        if (response.data.userType === "Client") {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
          token = response.data.token;
          localStorage.setItem("loginToken", token);

          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1500);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Invalid User",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        });
      }
    } else {
      Swal.fire(
        'Fields are empty?',
        'All fields are mandatory!!',
        'question'
      )
    }

    if (rememberMe) {
      localStorage.setItem("jwtToken", token);

    } else {
      localStorage.removeItem("jwtToken");
    }
    Cookies.set("jwtToken", token);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <div className="page-heading flex flex-col items-center gap-5 mt-4 md:mt-10 md:items-start">
          <h1 className=" text-xl lg:text-3xl  font-[700] text-[#414A53] font-publicSans">
            Login
          </h1>
          <p className="style-[Public Sans] text-[#21262C]  text-sm lg:text-lg text-center md:text-start font-publicSans">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
        <form method="POST" onSubmit={handleFormSubmit} className="mt-10">
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
              className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 rounded-lg text-base md:text-xl focus:outline-none md:py-3 md:px-4"
              placeholder="Enter your email"
              value={inputLoginData.email}
              onChange={handleLoginData}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col my-5">
            <div className="flex justify-between py-2">
              <label
                htmlFor="password"
                className="font-[500] text-[#85909B] text-base font-publicSans"
              >
                Password
              </label>
              <Link to="/forgot-password" className="text-[#377EF9] font-publicSans">
                Forgot Password?
              </Link>

            </div>
            <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="mt-1  py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                placeholder="Enter your password"
                value={inputLoginData.password}
                onChange={handleLoginData}
                autoComplete="off"
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
          <div className="flex flex-col gap-5 justify-between mt-5 md:flex-row lg:mt-10">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="remember-me"
                name="lsRememberMe"
                className="w-[1.7rem] h-[1.7rem] accent-[#31A05D] cursor-pointer  focus:ring-0 focus:ring-offset-0 focus:outline-none"
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <label
                htmlFor="remember-me"
                className="text-[#85909B] font-publicSans"
              >
                Remember me
              </label>
            </div>
            <Button
              type="submit"
              className="py-4 px-8 text-white bg-[#31A05D] rounded-lg text-[1rem] font-[500] md:py-4 md:px-5 font-publicSans"
              variant="gradient"
            >
              Login Now!
            </Button>
          </div>
        </form>
        <div className="flex justify-center md:justify-start mt-5">
          <Link
            to={"/signup"}
            className="text-[#85909B] font-publicSans mt-5 text-base"
          >
            New User?
            <span className="text-[#2DAF61] hover:underline hover:cursor-pointer">
              {" "}
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

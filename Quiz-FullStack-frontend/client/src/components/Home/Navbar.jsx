import React, { useState, useEffect } from "react";
import userImage from "../../assets/profile_image/user_image.png";
import defaultImage from "../../assets/profile_image/default_image.png";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [userData, setUserData] = useState({ name: "" });
  const navigate = useNavigate();

  let isLogin = localStorage.getItem("loginToken");

  useEffect(() => {
    if (isLogin) {
      try {
        let decoded = JSON.parse(window.atob(isLogin.split(".")[1]));
        setUserData({
          name: decoded.name || "",
        });
      } catch (error) {
        console.log("Token verification failed:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loginToken");
        navigate("/login");
      }
    });
  };

  const toggleProfileDropdown = () => {
    setIsOpenProfile((prev) => !prev);
  };

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar bg-white flex flex-col md:flex-row md:px-5 lg:px-16 justify-between w-full">
        <div className="flex items-center justify-evenly md:justify-start md:gap-4 mt-5 md:mt-0 border-black">
          <p className="text-grey text-2xl font-publicSans font-[400] cursor-pointer">
            <span className="text-green font-bold ">Queen </span>quizzie
          </p>
          <span className="text-lightGrey text-3xl font-extralight">|</span>
          <p className="text-grey font-publicSans pt-2 font-[700]">
            ONLINE QUIZ
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-0 lg:gap-[6rem] items-center">
          <div className="flex gap-5">
            <span className="text-[#092C4C] text-lg font-medium font-publicSans cursor-pointer">
              Video List
            </span>
            <span className="text-lightGrey text-xl font-extralight">|</span>
            <span className="text-[#092C4C] text-lg font-medium font-publicSans cursor-pointer">
              Start Quiz
            </span>
          </div>
          <div
            className="user-profile flex justify-center items-center cursor-pointer relative"
            onClick={toggleProfileDropdown}
          >
            {isLogin ? (
              <div className="user-image w-20 mt-3">
                <img src={userImage} alt="User" className="cursor-pointer" />
              </div>
            ) : (
              <div className="user-image w-9 my-6 me-5">
                <img
                  src={defaultImage}
                  alt="User"
                  className="cursor-pointer"
                  onClick={navigateToLoginPage}
                />
              </div>
            )}

            <div>
              <p className="user-text text-[#092C4C] text-base font-[Roboto] font-[700]">
                {isLogin ? (
                  "Hello!"
                ) : (
                  <Link
                    to={"/login"}
                    className="text-lg hover:text-blue-700 hover:underline hover:scale-110"
                  >
                    Login
                  </Link>
                )}
                <span
                  className={`user-name font-publicSans text-[#092C4C] font-light text-style ps-1 ${
                    userData.name.length > 7 ? "md:hidden lg:inline-block" : ""
                  }`}
                >
                  {isLogin && userData.name
                    ? userData.name.length > 11
                      ? userData.name.substring(0, 11) + "... "
                      : userData.name
                    : " "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </nav>
      {isOpenProfile && isLogin && (
        <div className="user-profile-dropdown flex flex-col items-center absolute top-[12.5rem] md:top-[5rem] right-[25%] md:right-[1%]  lg:right-[8%] xl:right-[6%] 2xl:right-[5%] w-[10rem] rounded-md bg-white border border-gray-200">
          <ul className="menu-items flex flex-col gap-2 w-full pt-3 text-center cursor-pointer ">
            <li className="menu-item p-2 hover:bg-blue-300">Profile</li>
            <hr />
            <li className="menu-item p-2 hover:bg-blue-300">Settings</li>
            <hr />
            <li
              className="menu-item p-2 hover:bg-blue-300"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;

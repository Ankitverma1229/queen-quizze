import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LeftNavbar = () => {
  const navigate = useNavigate();

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };

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
        localStorage.removeItem('loginToken');
        navigate("/");
      }
    });
  };

  return (
    <div className="lg:w-[30%]">
      <ul className="w-full flex flex-col sm:flex-row flex-wrap justify-center items-center lg:flex-col sm:gap-5">
        <li className="font-[500] font-publicSans text-[20px] w-[100%] sm:w-[15%] lg:w-[80%] md:text-center lg:text-start px-5 py-2 rounded-full hover:text-green hover:bg-[#D2E5DC] hover:cursor-pointer">
          <NavLink to={"/home"} style={navLinkStyles}>
            Videos
          </NavLink>
        </li>

        <li className="font-[500] font-publicSans text-[20px] w-[100%] sm:w-[25%] lg:w-[80%] md:text-center lg:text-start px-5 md:px-2 lg:px-5 py-2 rounded-full hover:text-green hover:bg-[#D2E5DC] hover:cursor-pointer">
          <NavLink to={"/category"} style={navLinkStyles}>
            Video Categories
          </NavLink>
        </li>

        <li className="font-[500] font-publicSans text-[20px] w-[100%] sm:w-[25%] lg:w-[80%] md:text-center lg:text-start px-5 py-2 rounded-full hover:text-green hover:bg-[#D2E5DC] hover:cursor-pointer">
          <NavLink to={"/applicants"} style={navLinkStyles}>
            Applicants
          </NavLink>
        </li>

        <li className="font-[500] font-publicSans text-[20px] w-[100%] sm:w-[25%] lg:w-[80%] md:text-center lg:text-start px-5 py-2 rounded-full hover:text-green hover:bg-[#D2E5DC] hover:cursor-pointer">
          <button className="font-normal" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavbar;

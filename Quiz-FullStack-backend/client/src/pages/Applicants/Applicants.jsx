import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LeftNavbar from "../../component/AdminHomePage/LeftNavbar";
import axios from "axios";
import Swal from 'sweetalert2'

const Applicants = () => {
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getUserData`
      );
      if (response) {
        setUserData(response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cannot get user data!',
      })
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section className="applicants-section flex flex-col justify-evenly lg:flex-row lg:mt-28 pt-20 xl:mx-40 md:h-[80vh] lg:me-2">
      <LeftNavbar />
      <div className="bg-white rounded-lg mt-5 md:mt-10 lg:mt-0 w-[100%] lg:ms-6 lg:w-[80%] xl:w-[90%] h-[68vh] md:h-[71vh] overflow-y-scroll">
        <div className="bg-white sticky top-0 pt-1 z-[1] w-[100%]">
          <h1 className="text-3xl text-[#21262C] m-10">Applicants</h1>
          <hr className="font-bold"></hr>
        </div>
        <Table className="w-[70vw]">
          <Thead className="sticky top-[7.55rem] bg-white z-[1]">
            <Tr className=" text-[#414A53]">
              <Th className="text-xl font-medium text-center py-5">Index</Th>
              <Th className="text-xl font-medium text-start ps-5">Name</Th>
              <Th className="text-xl font-medium text-start">Email</Th>
              <Th className="text-xl font-medium text-start">Video Title</Th>
              <Th className="text-xl font-medium text-start">Marks</Th>
            </Tr>
          </Thead>
          {userData.map((items, i) => (
            <Tbody className="even:bg-gray-100">
              <Tr className="text-[#092C4C]">
                <Td className="p-5 text-center ">{i + 1}</Td>
                <Td className="text-start ps-5">{items.name}</Td>
                <Td className="text-start ps-1">{items.email}</Td>
                <Td className="text-start ps-1">
                  {items.videoTitle
                    ? items.videoTitle.length > 12
                      ? items.videoTitle.substring(0, 12) + "..."
                      : items.videoTitle
                    : ""}
                </Td>
                <Td className="text-start ps-1">
                  {items.score > 0 ? items.score : 0}/{items.totalMarks}
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </div>
    </section>
  );
};

export default Applicants;

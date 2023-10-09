import React, { useState, useEffect } from "react";
import Navbar from "../../components/Home/Navbar";
import PassScreen from "../../components/ResultScreen/PassScreen";
import FailureScreen from "../../components/ResultScreen/FailureScreen";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResultPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const passingMarks = userData.totalMarks / 2;

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/api/admin/getUserData"
      );

      if (response) {
        const data = response.data.find((item) => item._id === userId);
        setUserData(data);
      }
    } catch (error) {
      alert("Cannot get user data");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section className="h-full">
      <Navbar userName={userData.name} />
      <div className="w-[100%] h-[calc(100vh-20vh)] flex justify-center items-center">
        {userData.score >= passingMarks ? (
          <PassScreen score={userData.score} totalMarks={userData.totalMarks} />
        ) : (
          <FailureScreen
            score={userData.score >= 0 ? userData.score : 0}
            totalMarks={userData.totalMarks}
          />
        )}
      </div>
    </section>
  );
};

export default ResultPage;

import React, { useState, useEffect, useRef } from "react";
import PreviewComponent from "../../components/PreviewPage/PreviewComponent.jsx";
import axios from "axios";
import CountDown from "../../components/PreviewPage/CountDown.jsx";
import ReactPaginate from "react-paginate";
import { useParams, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

const PreviewPage = () => {
  const { question_id } = useParams();
  const [newQuizData, setNewQuizData] = useState([]);
  const [quizDuration, setQuizDuration] = useState("");
  const [questions, setQuestions] = useState([]);
  const [videoTitle, setVideoTitle] = useState();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [limit, setLimit] = useState(15);
  const [pageCount, setPageCount] = useState(1);
  const [totalTime, setTotalTime] = useState(0);
  const [text, setText] = useState("");
  const currentPage = useRef();
  const navigate = useNavigate();
  const [marks, setMarks] = useState([]);

  let previewPageData;
  let totalMarks = 0;

  const getPaginatedUsers = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:6500/api/admin/paginateQuestion/${question_id}?page=${currentPage.current}&limit=${limit}`
      );
      setMarks(
        responseData.data.newData.map((items) => items.questionData.marks)
      );
      setPageCount(responseData.data.pageCount);
      let quizDetails = responseData.data.newData;
      setQuestions(quizDetails);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageChange = async (e) => {
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  };

  const getAllQuestion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/api/admin/QuestionData"
      );
      const quizDetails = response.data.newData;
      previewPageData = quizDetails.find((data) => data._id === question_id);
      let { questionAllData, quiz_Id } = previewPageData;
      setQuizDuration(quiz_Id.quizDuration);
      setNewQuizData(questionAllData);
      setVideoTitle(quiz_Id.video_Id.videoTitle);
    } catch (error) {
      console.log(error);
    }
  };

  newQuizData.map((items) => {
    totalMarks += Number(items.questionData.marks);
  });

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    const timer = localStorage.getItem("timer");
    questions.forEach((question, index) => {
      const isCorrect = selectedOptions[index] === question.correctAnswer;
      totalScore += isCorrect ? marks[index] : 0;
    });

    const userDetails = {
      name: userData.name,
      email: userData.email,
      videoTitle: videoTitle,
      score: totalScore ? totalScore : -1,
      totalMarks: totalMarks,
    };

    try {
      const response = await axios.post(
        "http://localhost:6500/api/admin/userData",
        userDetails
      );
      if (response) {
        const userId = response.data.storedUserData._id;
        if (timer) {
          Swal.fire({
            title: "Times up!!!",
            text: "Now submit your answer",
            icon: "warning",
            confirmButtonText: "Submit",
            confirmButtonColor: "#31A05D",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/result/${userId}`, { replace: true });
            }
            localStorage.removeItem("timer");
          });
        } else {
          Swal.fire({
            title: "Submit",
            text: "Are you sure you want to proceed?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "No, go back",
            confirmButtonColor: "#31A05D",
            cancelButtonColor: "#D33F49",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/result/${userId}`, { replace: true });
            }
            localStorage.removeItem("timer");
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("loginToken");
    if (storedToken) {
      try {
        let decoded = JSON.parse(window.atob(storedToken.split(".")[1]));
        setUserData({
          name: decoded.name || "",
          email: decoded.email || "",
        });
      } catch (error) {
        console.log("Token verification failed:", error);
      }
    }
    currentPage.current = 1;
    getPaginatedUsers();
    getAllQuestion();

    if (quizDuration) {
      const match = quizDuration.match(/(\d+)\s*(\D+)/);
      if (match) {
        setTotalTime(parseInt(match[1], 10));
        setText(match[2]);
      }
    }
  }, [quizDuration]);

  const renderSubmitButton = () => {
    if (currentPage.current === pageCount) {
      return (
        <Button
          className="bg-[#31A05D] text-white py-3 px-6 text-lg rounded-lg my-5 self-end w-52 md:w-1/4 xl:w-32"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className=" md:w-[100vw] flex flex-col md:flex-row justify-center mt-20 font-publicSans">
      <div className=" xl:w-[80%] bg-white rounded-lg">
        <div className="flex flex-col items-center xl:flex-row justify-between md:w-[95%] md:mx-auto">
          <div className="flex flex-col md:flex-row justify-center md:justify-around xl:justify-between md:gap-4 mt-4 items-center xl:w-[40%]  md:py-6 ">
            <h2 className="text-xl md:text-3xl font-bold text-grey">
              Russian space program
            </h2>
            <span className="w-32 md:w-[5rem] text-center text-[#31A05D] bg-[#DCEEE3] px-3 py-1 rounded-md md:mt-1 mt-3 font-semibold">
              Quiz
            </span>
          </div>
          <div className="flex gap-3 font-publicSans text-[#414A53]">
            <p className="font-semibold">Candidate Name:</p>
            <span className="text-black font-bold">{userData.name}</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-2  lg:gap-10 mx-1 md:mx-8 mt-5 lg:flex-row  md:items-center ">
          <div className="flex items-center md:justify-center gap-3">
            <p className="text-[#414A53] font-thin text-lg">Email:</p>
            <p className="text-[#414A53] font-extrabold text-lg">
              {userData.email
                ? userData.email.length > 20
                  ? userData.email.substring(0, 20) + "..."
                  : userData.email
                : ""}
            </p>
          </div>
          <div className="flex items-center md:justify-center gap-3">
            <p className="text-[#414A53] font-thin text-lg">Total Questions:</p>
            <span className="text-[#414A53] font-extrabold text-lg">
              {newQuizData.length}
            </span>
          </div>
          <div className="flex items-center md:justify-center gap-3">
            <p className="text-[#414A53] font-thin text-lg">Time:</p>
            <CountDown totalTime={totalTime * 60} handleSubmit={handleSubmit} />
            <span className="text-[#414A53] font-extrabold text-lg">
              {text}
            </span>
          </div>
          <div className="flex items-center md:justify-center gap-3">
            <p className="text-[#414A53] font-thin text-lg">Total Marks:</p>
            <span className="text-[#414A53] font-extrabold text-lg">
              {totalMarks}
            </span>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="md:w-[95%]  md:mx-auto  mt-10">
          {questions.map((questionData, index) => {
            return (
              <PreviewComponent
                key={questionData._id}
                {...questionData}
                id={index}
                correctAnswer={questionData.correctAnswer}
                currentPage={currentPage.current}
                handleOptionSelect={handleOptionSelect}
                marks={marks}
              />
            );
          })}
          <div className="flex items-center flex-col md:flex-row md:justify-between justify-center">
            <div className="flex mt-10 md:mt-0">
              
            </div>
            {renderSubmitButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;

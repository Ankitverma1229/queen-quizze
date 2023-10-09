import React, { useState, useEffect, useRef } from "react";
import PreviewComponent from "../../component/PreviewPage/PreviewComponent";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useParams, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

const PreviewPage = () => {
  const { question_id } = useParams();
  const [newQuizData, setNewQuizData] = useState([]);
  const [quizDuration, setQuizDuration] = useState();
  const [questions, setQuestions] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const navigate = useNavigate();

  let allData;
  let sum = 0;

  const handlePageClick = async (e) => {
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  };

  const getPaginatedUsers = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:6500/api/admin/paginateQuestion/${question_id}?page=${currentPage.current}&limit=${limit}`
      );
      setPageCount(responseData.data.pageCount);
      let quizDetails = responseData.data.newData;
      setQuestions(quizDetails);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllQuestion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/api/admin/QuestionData"
      );
      const quizDetails = response.data.newData;
      allData = quizDetails.find((data) => data._id === question_id);
      let { questionAllData, quiz_Id } = allData;
      setQuizDuration(quiz_Id.quizDuration);
      setNewQuizData(questionAllData);
    } catch (error) {
      console.log(error);
    }
  };

  newQuizData.map((items) => {
    sum += Number(items.questionData.marks);
  });

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUsers();
    getAllQuestion();
  }, []);

  const handleSubmit = () => {
    Swal.fire({
      title: "Preview Page",
      text: "This is a preview. Are you sure you want to proceed?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, go back",
      confirmButtonColor: "#31A05D",
      cancelButtonColor: "#D33F49",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/home", { replace: true });
      }
    });
  };

  return (
    <div className=" md:w-[100vw] flex flex-col md:flex-row justify-center mt-20 font-publicSans">
      <div className="md:w-[80%] bg-white rounded-lg">
        <div className="flex flex-col xl:flex-row justify-between md:w-[95%] md:mx-auto">
          <div className="flex flex-col md:flex-row justify-center md:justify-around xl:justify-between md:gap-4 mt-4 items-center xl:w-[40%]  md:py-6 ">
            <h2 className="text-xl md:text-3xl font-bold text-grey">
              Russian space program
            </h2>
            <span className="w-32 md:w-[5rem] text-center text-[#31A05D] bg-[#DCEEE3] px-3 py-1 rounded-md md:mt-1 mt-3 font-semibold">
              Quiz
            </span>
          </div>
          <div className="flex flex-col gap-2  md:gap-0 mt-5 md:flex-row md:justify-around xl:justify-between md:items-center xl:w-[45%]">
            <div className="flex items-center md:justify-center gap-3">
              <p className="text-[#414A53] font-thin text-lg">
                Total Questions:
              </p>
              <span className="text-[#414A53] font-extrabold text-lg">
                {newQuizData.length}
              </span>
            </div>
            <div className="flex items-center md:justify-center gap-3">
              <p className="text-[#414A53] font-thin text-lg">Time:</p>
              <span className="text-[#414A53] font-extrabold text-lg">
                {quizDuration}
              </span>
            </div>
            <div className="flex items-center md:justify-center gap-3">
              <p className="text-[#414A53] font-thin text-lg">Total Marks:</p>
              <span className="text-[#414A53] font-extrabold text-lg">
                {sum}
              </span>
            </div>
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
              />
            );
          })}
          <div className="flex md:justify-between justify-center">
            <div className="flex justify-center mt-10 md:mt-0">
              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <span className="px-4 py-2 flex items-center justify-center rounded-md">
                    <BsChevronRight />
                  </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel={
                  <span className="px-4 py-2 flex items-center justify-center rounded-md">
                    <BsChevronLeft />
                  </span>
                }
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center my-4"
                pageClassName="mx-2 font-Public Sans font-semibold rounded-md hover:text-white"
                pageLinkClassName="block px-4 py-2 rounded-md border-2 border-gray-300  hover:bg-green"
                previousClassName="mr-2"
                nextClassName="ml-2"
                activeClassName="bg-green border-none text-white"
              />
            </div>
            <Button
              className="bg-[#31A05D] text-white py-3 px-6 text-lg rounded-lg my-5 self-end w-52 md:w-1/4 xl:w-32"
              variant="gradient"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;

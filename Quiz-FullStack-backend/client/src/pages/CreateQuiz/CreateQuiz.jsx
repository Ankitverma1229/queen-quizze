import React, { useState } from "react";
import "./CreateQuiz.scss";
import PageTab from "../../component/PageTab/PageTab";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";

const toastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const CreateQuiz = (props) => {
  const quizData = {
    quizTitle: "",
    quizDuration: "",
    videoDescription: "",
    emailId: "",
  };
  const [handleQuizData, setQuizData] = useState(quizData);
  const { video_id } = useParams();
  const navigate = useNavigate();
  let quiz_id;
  const addQuizHandler = (e) => {
    e.preventDefault();
    let value = e.target.value.replace(/\s+/g, " ");
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setQuizData({ ...handleQuizData, [e.target.name]: capitalizedValue });
  };

  const handleQuizDetails = async (e) => {
    e.preventDefault();
    const { quizTitle, videoDescription, emailId } = handleQuizData;
    if (!quizTitle.trim() || !videoDescription.trim() || !emailId) {
      toast.warn("All fields are mandatory!!", toastOptions);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailId)) {
      toast.warn("Invalid email address!!", toastOptions);
    } else {
      try {
        const response = await axios.post(
          `http://localhost:6500/api/admin/createQuiz/${video_id}`,
          handleQuizData
        );

        if (response.status === 201) {
          quiz_id = response.data._id;
          toast.success("Submit successfully!!", toastOptions);
          setTimeout(() => {
            navigate(`/home/add-question/${quiz_id}`, { replace: true });
            setQuizData(quizData);
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="add-video-section mt-4  flex justify-center items-center md:w-[100vw] md:min-h-[100vh]">
      <div className="add-video-container bg-white rounded-xl w-[100%] lg:w-[85vw] xl:w-[70vw] mx-auto">
        <PageTab activePage={props.isActivePage + 1} />
        <hr className="font-bold"></hr>
        <form className="w-[100%]">
          <div className="mx-5 space-y-2 mt-10 md:mx-10">
            <label
              htmlFor="quiz-title"
              className="text-[#85909B] text-[1rem] font-publicSans"
            >
              Quiz Title
            </label>
            <input
              type="text"
              className="bg-[#F7F8FB] w-full py-4 px-5 text-xl rounded-xl border-solid border-2 focus:outline-none "
              id="quiz-title"
              placeholder="Add quiz title"
              name="quizTitle"
              value={handleQuizData.quizTitle}
              onChange={addQuizHandler}
              required
            />
          </div>
          <div className="mx-5 space-y-2 mt-10 md:mx-10">
            <label
              htmlFor="quiz-duration"
              className="text-[#85909B] text-[1rem] font-publicSans"
            >
              Quiz Duration
            </label>
            <input
              type="text"
              className="bg-[#F7F8FB] w-full py-4 px-5 text-xl rounded-xl border-solid border-2 focus:outline-none"
              id="quiz-duration"
              placeholder="Add Quiz duration"
              name="quizDuration"
              value={handleQuizData.quizDuration}
              onChange={addQuizHandler}
              required
            />
          </div>
          <div className="mx-5 space-y-2 mt-10 md:mx-10">
            <label
              htmlFor="quiz-title"
              className="text-[#85909B] text-[1rem] font-publicSans "
            >
              Video Description
            </label>
            <textarea
              type="text"
              className="bg-[#F7F8FB] w-full py-4 px-5 text-xl rounded-xl border-solid border-2 h-[13rem] resize-none focus:outline-none"
              id="quiz-video-description"
              placeholder="Video description"
              name="videoDescription"
              value={handleQuizData.videoDescription}
              onChange={addQuizHandler}
              required
            />
          </div>
          <div className="mx-5 mt-5 mb-10 md:flex-row md:mx-10">
            <div className=" space-y-2 mt-10 ">
              <label
                htmlFor="email-id"
                className="text-[#85909B] text-[1rem] font-publicSans"
              >
                Email Id
              </label>
              <input
                type="email"
                className="bg-[#F7F8FB] w-full py-4 px-5 text-xl rounded-xl border-solid border-2 focus:outline-none text-style"
                id="email-id"
                placeholder=" Enter your email"
                name="emailId"
                value={handleQuizData.emailId}
                onChange={addQuizHandler}
                required
              />
            </div>
          </div>

          <div className="flex justify-end mx-10 mb-3">
            <Button
              type="submit"
              variant="gradient"
              className="py-4 px-4 bg-[#31A05D] text-white rounded-lg lg:px-6"
              onClick={handleQuizDetails}
            >
              Save & Next
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateQuiz;

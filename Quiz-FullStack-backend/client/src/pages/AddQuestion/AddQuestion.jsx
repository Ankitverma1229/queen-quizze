import React, { useState } from "react";
import axios from "axios";
import "./AddQuestion.scss";
import PageTab from "../../component/PageTab/PageTab";
import deleteIcon from "../../assets/addQuestion/delete.svg";
import plusIcon from "../../assets/addQuestion/plus.svg";
import CreateOption from "../../component/AddQuestion/CreateOption";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";

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

const AddQuestion = (props) => {
  const [questionData, setQuestionData] = useState({ question: "", marks: "" });
  const [optionData, setOptionData] = useState({ optionTitle: "" });
  const [options, setOptions] = useState([]);
  const [optionFieldOpen, setOptionFieldOpen] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [isOptionClicked, setIsOptionClicked] = useState("Add Option");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const { quiz_id } = useParams();
  const navigate = useNavigate();

  let question_id = "";

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value.replace(/\s+/g, " ");

    if (inputName === "question" && inputValue) {
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    }
    setQuestionData({ ...questionData, [inputName]: inputValue });
  };

  const handleOptionData = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value.replace(/\s+/g, " ");

    if (inputName === "optionTitle" && inputValue) {
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    }

    setOptionData({ ...optionData, [inputName]: inputValue });
  };

  const handleOpenOptions = (e) => {
    e.preventDefault();
    setOptionFieldOpen((prev) => !prev);
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    const { optionTitle } = optionData;

    const handleAlreadyExistOption = options.find(
      (option) => option.optionTitle === optionTitle
    );

    if (handleAlreadyExistOption) {
      toast.error("Option already exists!!", toastOptions);
    } else if (!optionTitle.trim()) {
      toast.warn("Option title is mandatory!!", toastOptions);
    } else if (options.length >= 4) {
      toast.warn("You can only have 4 options!", toastOptions);
      setOptionData("");
      setOptionFieldOpen(false);
    } else {
      setOptions((items) => {
        return [...items, optionData];
      });
      setOptionFieldOpen(false);
      setOptionData({ optionTitle: "" });
      setIsOptionClicked(isOptionClicked ? "Add another Option" : "Add Option");
    }
  };

  const handleDeleteOption = (id) => {
    setOptions((prevOptions) => {
      return prevOptions.filter((element, index) => {
        return index !== id;
      });
    });
    setCorrectAnswer(0);
  };

  const toggleRequired = () => {
    setIsRequired((prevRequired) => !prevRequired);
  };

  const handleDeleteQuestion = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this question!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#31A05D",
      cancelButtonColor: "#D33F49",
    }).then((result) => {
      if (result.isConfirmed) {
        const savedQuestions =
          JSON.parse(localStorage.getItem("savedQuestions")) || [];
        const updatedQuestions = savedQuestions.filter((element) => {
          return element.questionData.question !== questionData.question;
        });
        localStorage.setItem(
          "savedQuestions",
          JSON.stringify(updatedQuestions)
        );
        handleResetQuestion();
        Swal.fire("Deleted!", "Your question has been deleted.", "success");
      }
    });
  };

  const handleSaveQuestionToLocalStorage = () => {
    const { question, marks } = questionData;
    const savedQuestions =
      JSON.parse(localStorage.getItem("savedQuestions")) || [];
    const handleAlreadyExist = savedQuestions.find(
      (item) => item.questionData.question === question
    );

    if (handleAlreadyExist) {
      toast.error("Question already exists", toastOptions);
    } else if (
      !question.trim() ||
      options.length === 0 ||
      !marks.trim() ||
      correctAnswer === 0
    ) {
      toast.warn("All fields are required", toastOptions);
    } else if (parseInt(marks) > 10) {
      toast.warn("Marks cannot be greater than 10", toastOptions);
    } else {
      const newQuestion = {
        questionData,
        options,
        isRequired,
        correctAnswer,
      };
      const updatedQuestion = [...savedQuestions, newQuestion];
      localStorage.setItem("savedQuestions", JSON.stringify(updatedQuestion));
      toast.success("Question saved successfully!!", toastOptions);
    }
  };

  const handleResetQuestion = () => {
    setQuestionData({ question: "", marks: "" });
    setOptionData({ optionTitle: "" });
    setOptions([]);
    setIsOptionClicked("Add Option");
    setOptionFieldOpen(false);
    setCorrectAnswer(0);
    setIsRequired(false);
  };

  const onSelectOption = (id) => {
    setCorrectAnswer(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddOption(e);
    }
  };

  const handleAddQuestionData = async (e) => {
    e.preventDefault();
    try {
      const savedQuestions = JSON.parse(localStorage.getItem("savedQuestions"));
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/addQuestion/${quiz_id}`, {
          questionAllData: savedQuestions,
        })
        .then((response) => {
          question_id = response.data._id;
        });
      toast.success("Loading preview page!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.removeItem("savedQuestions");
      handleResetQuestion();
      setTimeout(() => {
        navigate(`/preview-page/${question_id}`, { replace: true });
      }, 5000);
    } catch (error) {
      console.log("Error storing question in the database:", error);
      toast.error("Questions is not stored in the database!!", toastOptions);
    }
  };

  return (
    <section className="add-question-section  flex flex-col justify-center items-center md:w-[100vw] md:min-h-[100vh]">
      <div className="add-video-container bg-white rounded-lg w-[100%] lg:w-[85vw] xl:w-[70vw] mx-auto">
        <PageTab activePage={props.isActivePage + 2} />
        <hr className="font-bold"></hr>
        <form className="w-full">
          <div className="mx-5 space-y-2 mt-10 md:mx-10">
            <label
              htmlFor="questionTitle"
              className="text-[#85909B] text-base md:text-xl font-publicSans"
            >
              Question Title
            </label>
            <input
              type="text"
              className="bg-[#F7F8FB] w-full py-4 px-5 text-base md:text-xl rounded-xl border-solid border-2 focus:outline-none"
              id="questionTitle"
              placeholder="Add question title"
              name="question"
              value={questionData.question}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-10 px-5 md:px-0 md:mx-10">
            <div className="gap-5 flex flex-wrap">
              {options.map((optionValue, index) => (
                <CreateOption
                  option={optionValue}
                  key={index}
                  id={index}
                  onDeleteOption={handleDeleteOption}
                  onSelectOption={onSelectOption}
                />
              ))}
            </div>
            <div className="mt-6">
              <a
                href="/"
                className="text-[#85909B] hover:text-[#31A05D] text-[1.2rem] hover:underline"
                onClick={handleOpenOptions}
              >
                {isOptionClicked}
              </a>
            </div>
          </div>
          {optionFieldOpen && (
            <div className="mx-5 space-y-2 mt-10 md:mx-10 flex flex-col">
              <label
                htmlFor="optionTitle"
                className="text-[#85909B] text-base md:text-xl font-publicSans"
              >
                Option Title
              </label>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                <input
                  type="text"
                  className="bg-[#F7F8FB] w-full md:w-[55%] lg:w-[48%] xl:w-[30%] py-4 px-5 text-base md:text-xl rounded-xl border-solid border-2 focus:outline-none"
                  name="optionTitle"
                  value={optionData.optionTitle}
                  onChange={handleOptionData}
                  onKeyDown={handleKeyDown}
                  id="optionTitle"
                  placeholder="Add option"
                />
                <Button
                  className="py-4 px-6 bg-[#31A05D] text-white text-sm md:text-lg rounded-lg"
                  variant="gradient"
                  onClick={handleAddOption}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col mx-5 space-y-2 mt-10 md:mx-10">
            <label
              htmlFor="marks"
              className="text-[#85909B] text-base md:text-xl font-publicSans"
            >
              Marks
            </label>
            <input
              type="number"
              className="bg-[#F7F8FB] py-4 px-5 w-full md:w-[55%] lg:w-[48%] xl:w-[30%]  text-base md:text-xl rounded-xl border-solid border-2 focus:outline-none"
              name="marks"
              value={questionData.marks}
              onChange={handleInputChange}
              id="marks"
              placeholder="Add marks"
            />
          </div>
        </form>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-10 mt-10 md:mx-10">
          <div className=" flex items-center space-x-3">
            <span className="text-[#85909B] text-[1.2rem] font-publicSans">
              Required
            </span>
            <Switch
              className="bg-[#DADBE2]"
              onClick={toggleRequired}
              checked={isRequired}
            />
          </div>

          <div className=" flex items-center space-x-10">
            <button onClick={handleDeleteQuestion}>
              <img
                src={deleteIcon}
                alt="delete button"
                className="w-[1.5rem]"
              />
            </button>
            <Button
              type="submit"
              className="py-3 px-6 bg-[#31A05D] text-white text-lg rounded-lg hover:bg-emerald-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={handleSaveQuestionToLocalStorage}
            >
              Save Question
            </Button>
          </div>
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center space-x-5 py-3 md:px-6 mt-7 bg-white rounded-lg w-[100%] lg:w-[85vw] xl:w-[70vw] mx-auto"
        onClick={handleResetQuestion}
      >
        <div className="bg-[#31A05D] py-3 px-3.5 rounded-full ms-5 hover:bg-emerald-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
          <img
            src={plusIcon}
            alt="plus icon"
            variant="gradient"
            className="w-[1.5rem]"
          />
        </div>
        <p className="text-lg text-[1.2rem] text-[#414A53]">
          Add another question
        </p>
      </div>
      <div className=" flex justify-center gap-5 md:justify-end w-[100%] lg:w-[85vw] xl:w-[70vw] mx-auto">
        <Button
          className="bg-[#31A05D] text-white py-3 px-6 text-lg rounded-lg mt-5 self-end font-publicSans"
          variant="gradient"
          onClick={handleAddQuestionData}
        >
          Save & Next
        </Button>
      </div>
      <ToastContainer />
    </section>
  );
};
export default AddQuestion;

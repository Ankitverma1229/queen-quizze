import Categories from "../../component/AllCategories/getAllCategories";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftNavbar from "../../component/AdminHomePage/LeftNavbar";
import { ToastContainer, toast } from "react-toastify";
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

function Category() {
  const input = { newCategory: "" };
  const [newCategoryInput, setNewCategoryInput] = useState(input);
  const [allCategory, setAllCategory] = useState([]);

  function handleInputCategory(e) {
    const value = e.target.value.replace(/\s/g, " ");
    const capitalizedValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setNewCategoryInput({
      ...newCategoryInput,
      [e.target.name]: capitalizedValue,
    });
  }

  function showAllCategory() {
    axios
      .get("http://localhost:6500/api/admin/videoCategoryData")
      .then((response) => {
        setAllCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const CheckExistance = allCategory.find(
    (data) => data.category === newCategoryInput.category
  );

  function handelCategory(e) {
    e.preventDefault();
    const { category } = newCategoryInput;
    if (CheckExistance) {
      toast.error("This category is already added", toastOptions);
    } else {
      if (category && category.trim()) {
        setAllCategory((items) => {
          return [...items, newCategoryInput];
        });
      } else {
        toast.warn("All fields are mandatory", toastOptions);
      }
    }

    if (category) {
      axios
        .post("http://localhost:6500/api/admin/videoCategory", newCategoryInput)

        .then((response) => {
          console.log(response);
          document.getElementById("questionTitle").value = "";
          showAllCategory();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  }

  useEffect(() => {
    showAllCategory();
  }, []);

  const deleteOption = (id) => {
    setAllCategory((oldOptions) => {
      return oldOptions.filter((element, index) => {
        return index !== id;
      });
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handelCategory(e);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly xl:mx-40 lg:mt-28 pt-20 lg:me-2">
        <LeftNavbar />
        <div className="bg-white mt-5 md:mt-10 lg:mt-0 lg:ms-6 w-[100%] lg:w-[80%] xl:w-[89%] min-h-[36rem] md:min-h-[32rem] rounded-md  flex flex-col justify-evenly px-2 md:px-8">
          <div className="flex flex-col flex-wrap mt-4">
            <h2 className="text-2xl">Add Video Category</h2>
            <div className="space-y-2 mt-7 flex flex-col ">
              <label
                htmlFor="category"
                className="text-[#85909B] text-base md:text-xl font-publicSans"
              >
                Title
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  className="bg-[#F7F8FB] md:w-2/5 py-4 px-6 text-base md:text-xl rounded-xl border-solid border-2 focus:outline-none"
                  onChange={handleInputCategory}
                  onKeyDown={handleKeyDown}
                  id="questionTitle"
                  placeholder="Enter any Category"
                  name="category"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-[#31A05D] text-white rounded-lg lg:px-6 hover:bg-emerald-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  onClick={handelCategory}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <span className="text-2xl">All Categories</span>
            <div className="flex flex-wrap mt-8">
              {allCategory.map((category, index, _id) => {
                return (
                  <Categories
                    {...category}
                    id={index}
                    {..._id}
                    onSelect={deleteOption}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Category;

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Home/Navbar";
import VideoCards from "../../components/Home/VideoCards";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import axios from "axios";

const Home = () => {
  const [videoCardData, setVideoCardData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [limit, setLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  const handlePageClick = async (e) => {
    currentPage.current = e.selected + 1;
    getAllVideos();
  };

  const getAllVideos = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:6500/api/admin/paginateUser?page=${currentPage.current}&limit=${limit}`
      );
      setPageCount(responseData.data.pageCount);
      const extractedData = responseData.data.newData.map((item) => ({
        videoTitle: item.quiz_Id.video_Id.videoTitle,
        category: item.quiz_Id.video_Id.category,
        videoURL: item.quiz_Id.video_Id.videoURL,
        videoThumbnailURL: item.quiz_Id.video_Id.videoThumbnailURL,
        quizDuration: item.quiz_Id.quizDuration,
        videoDescription: item.quiz_Id.video_Id.videoDescription,
        question_id: item._id,
      }));
      setVideoCardData(extractedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/api/admin/videoCategoryData"
      );
      if (response) {
        setAllCategory(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterVideos = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    currentPage.current = 1;

    getAllVideos();
    getAllCategory();
  }, []);

  const filteredVideoData =
    filterCategory === "All"
      ? videoCardData
      : videoCardData.filter((item) => item.category === filterCategory);

  return (
    <>
      <section>
        <Navbar />
        <div className="flex flex-col justify-center items-center  md:w-[80%]  mx-auto mt-7 md:mt-16">
          <div className="category-container flex flex-col  md:flex-row w-full md:w-[60vw] lg:w-[70vw] xl:w-[60vw] cursor-pointer gap-5 h-[32vh] md:h-10 overflow-y-scroll md:overflow-x-scroll no-scrollbar">
            <button
              className="py-2 rounded-lg px-3 bg-[#D8DCE2] text-[#656A74] lg:text-[1.2rem] flex-shrink-0 font-publicSans hover:bg-[#31A05D] hover:text-white"
              onClick={() => filterVideos("All")}
            >
              All
            </button>
            {allCategory.map((items, i) => {
              return (
                <button
                  key={i}
                  className="py-2 rounded-lg px-3 bg-[#D8DCE2] text-[#656A74]  lg:text-[1.2rem] flex-shrink-0 font-publicSans hover:bg-[#31A05D] hover:text-white"
                  onClick={() => filterVideos(items.category)}
                >
                  {items.category
                    ? items.category.length > 15
                      ? items.category.substring(0, 15) + ""
                      : items.category
                    : ""}
                </button>
              );
            })}
          </div>
          <div className="mt-10 xl:h-[88vh] md:mt-14 lg:ps-2 flex flex-wrap md:justify-center lg:justify-start w-full gap-5 xl:gap-9">
            {filteredVideoData.map(
              (
                videoTitle,
                quizDuration,
                videoThumbnailURL,
                category,
                videoDescription,
                question_id
              ) => {
                return (
                  <VideoCards
                    {...videoTitle}
                    {...quizDuration}
                    {...videoThumbnailURL}
                    {...category}
                    {...videoDescription}
                    {...question_id}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="w-[80%] mx-auto flex justify-center md:justify-end mt-10">
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
      </section>
    </>
  );
};

export default Home;

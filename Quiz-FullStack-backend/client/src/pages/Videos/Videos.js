import VideoCard from "../../component/AdminHomePage/VideoCard.jsx";
import LeftNavbar from "../../component/AdminHomePage/LeftNavbar.js";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Videos() {
  const [videoCardData, setVideoCardData] = useState([]);
  const [limit, setLimit] = useState(6);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  const handlePageClick = async (e) => {
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  };

  const getPaginatedUsers = async () => {
    try {
      const responseData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/paginateUser?page=${currentPage.current}&limit=${limit}`
      );
      setPageCount(responseData.data.pageCount);
      const extractedData = responseData.data.newData.map((item) => ({
        videoTitle: item.quiz_Id.video_Id.videoTitle,
        category: item.quiz_Id.video_Id.category,
        videoThumbnailURL: item.quiz_Id.video_Id.videoThumbnailURL,
        quizDuration: item.quiz_Id.quizDuration,
        question_id: item._id,
      }));
      setVideoCardData(extractedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUsers();
  }, []);

  return (
    <>
      <div className="xl:mx-40 lg:mt-28 lg:me-2 ">
        <div className="flex justify-center lg:me-[6.4rem] xl:me-0 md:justify-end xl:w-[100%] ">
          <Link to={"/home/add-video"}>
            <button className="bg-green text-white px-4 mt-3 rounded flex items-center sm:justify-center gap-2 2xl:me-1 text-[18px] hover:bg-emerald-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              <span className="text-3xl font-light pb-1">+</span> Create video
            </button>
          </Link>
        </div>
        <div className="mt-7 flex flex-col lg:flex-row justify-evenly md:w-[100%] xl:min-h-[75vh]">
          <LeftNavbar />
          <div className="mt-5 md:mt-10 lg:mt-0 lg:w-[90%] lg:ms-6 flex flex-row flex-wrap gap-7 2xl:gap-5 justify-center xl:justify-start ">
            {videoCardData.map(
              (
                videoTitle,
                quizDuration,
                videoThumbnailURL,
                category,
                question_id
              ) => {
                return (
                  <VideoCard
                    {...videoTitle}
                    {...quizDuration}
                    {...videoThumbnailURL}
                    {...category}
                    {...question_id}
                  ></VideoCard>
                );
              }
            )}
          </div>
        </div>
        <div className="flex justify-center md:justify-end mt-10">
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
      </div>
    </>
  );
}

export default Videos;

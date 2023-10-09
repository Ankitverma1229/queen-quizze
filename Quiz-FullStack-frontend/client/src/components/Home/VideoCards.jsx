import React, { useState } from "react";
import "./videoCard.scss";
import VideoDetails from "../../components/VideoDetails/VideoDetails";
import { ImCross } from "react-icons/im";

const VideoCards = (props) => {
  const [videoDetailsVisible, setVideoDetailsVisible] = useState(false);

  const toggleVideoDetails = () => {
    localStorage.removeItem("totalTime");
    setVideoDetailsVisible(!videoDetailsVisible);
  };

  return (
    <>
      <div
        className="z-0 video-card bg-[#FFFFFF] flex flex-col w-full sm:w-[255px] sm:h-[328px] h-[400px] rounded-lg duration-[0.5s] hover:scale-[1.1] hover:cursor-pointer"
        onClick={toggleVideoDetails}
      >
        <div className="h-[75%] rounded-lg ">
          <img
            src={`http://localhost:6500/${props.videoThumbnailURL}`}
            alt="Video thumbnail"
            className="h-[100%] w-[100%] rounded-t-lg"
          />
        </div>
        <div className="ps-4 py-2 flex flex-col gap-3 h-[20%]">
          <h2 className="font-publicSans text-[700]  text-[20px] text-[#414A53] font-semibold">
            {props.videoTitle
              ? props.videoTitle.length > 17
                ? props.videoTitle.substring(0, 17) + "..."
                : props.videoTitle
              : ""}
          </h2>
          <div className="flex items-center gap-2 text-[#898F96] text-base">
            <p>
              {props.category
                ? props.category.length > 13
                  ? props.category.substring(0, 13) + "..."
                  : props.category
                : ""}
            </p>
            <span className="text-sm">|</span>
            <p>{props.quizDuration}</p>
          </div>
        </div>
      </div>
      {videoDetailsVisible && (
        <div className=" z-10 w-[100vw] h-[100vh] flex  justify-center items-center fixed top-0 left-0 bg-gray-800  bg-opacity-40">
          <div className="relative md:w-[70%] h-[90%] p-2 md:p-6 rounded-2xl overflow-y-hidden bg-white">
            <VideoDetails
              videoUrl={props.videoURL}
              videoTitle={props.videoTitle}
              quizDuration={props.quizDuration}
              category={props.category}
              videoDescription={props.videoDescription}
              question_id={props.question_id}
            />
            <div
              className="bg-red-600 p-2 absolute md:top-7 top-3 right-3 md:right-7 rounded-md cursor-pointer opacity-30 hover:opacity-90"
              onClick={toggleVideoDetails}
            >
              <ImCross className="text-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCards;

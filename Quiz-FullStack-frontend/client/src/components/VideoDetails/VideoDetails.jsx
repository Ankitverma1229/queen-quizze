import React, { useEffect, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { HiPause } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const VideoDetails = (props) => {
  const question_id = props.question_id;
  const videoRef = useRef(null);
  const [showNextButton, setShowNextButton] = useState("hidden");
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  function handleVideoEnd() {
    setShowNextButton("block");
  }

  function handlePreviewPage() {
    navigate(`/preview-page/${question_id}`);
  }
  const serverBaseUrl = "http://localhost:6500/";
  return (
    <>
      <div className="group rounded-lg flex justify-center md:h-[60%] relative">
        <video
          className="object-fill rounded-lg w-[100%]  rounded-t-lg"
          onEnded={handleVideoEnd}
          ref={videoRef}
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={`${serverBaseUrl}${props.videoUrl}`} type="video/mp4" />
        </video>

        <div className="opacity-0 group-hover:opacity-100  controls bg-white rounded-full sm:p-5 p-2 flex items-center justify-center absolute top-[40%] md:top-28 xl:top-44">
          <button className=" text-2xl sm:text-4xl" onClick={handlePlayPause}>
            {isPlaying ? (
              <HiPause className="text-[#F0346C]" />
            ) : (
              <FaPlay className=" ps-1 md:ps-2 text-[#F0346C]" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-5 font-publicSans items-center text-md">
        <h1 className="text-2xl md:text-4xl text-[#21262C]">
          {props.videoTitle
            ? props.videoTitle.length > 30
              ? props.videoTitle.substring(0, 30) + "..."
              : props.videoTitle
            : ""}
        </h1>
        <div className="flex gap-1 md:gap-5 text-[#898F96] font-semibold items-center">
          <p>
            {props.category
              ? props.category.length > 10
                ? props.category.substring(0, 10) + "..."
                : props.category
              : ""}
          </p>
          <span className="text-sm">|</span>
          <p>{props.quizDuration}</p>
        </div>
      </div>

      <div className="mt-7 h-[26%] md:h-[15%] text-center md:text-start overflow-hidden">
        <p>{props.videoDescription}</p>
      </div>

      <div className={`${showNextButton} flex justify-end mt-4`}>
        <Button
          className="bg-[#31A05D] text-white px-5 py-3 rounded-lg font-semibold"
          variant="gradient"
          onClick={handlePreviewPage}
        >
          Take a quiz
        </Button>
      </div>
    </>
  );
};

export default VideoDetails;

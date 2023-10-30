import "./VideoCard.scss";
import { useNavigate } from "react-router-dom";

function VideoCard(props) {
  const navigate = useNavigate();

  const toggleCardDetails = () => {
    navigate(`/preview-page/${props.question_id}`);
  };

  return (
    <>
      <div
        className="video-card bg-[#FFFFFF] flex flex-col  w-full sm:w-[255px] sm:h-[328px] h-[400px] rounded-lg duration-[0.5s] hover:scale-[1.1] hover:cursor-pointer"
        onClick={toggleCardDetails}
      >
        <div className="h-[75%] rounded-lg">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${props.videoThumbnailURL}`}
            alt="Video thumbnail"
            className="h-[100%] w-[100%] rounded-t-lg"
          />
        </div>
        <div className="ps-4 py-2 flex flex-col gap-1 h-[20%]">
          <h2 className="font-publicSans text-[700] text-[20px] text-[#414A53] font-semibold">
            {props.videoTitle
              ? props.videoTitle.length > 17
                ? props.videoTitle.substring(0, 17) + "..."
                : props.videoTitle
              : ""}
          </h2>
          <div className="flex items-center gap-4 text-[#898F96] text-base">
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
    </>
  );
}

export default VideoCard;

import React, { useState, useRef, useEffect } from "react";
import "./AddVideo.scss";
import PageTab from "../../component/PageTab/PageTab";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const AddVideo = (props) => {
    const [isListOpen, setListOpen] = useState(false);
    const [category, setCategory] = useState("");
    const videoTitleRef = useRef();
    const videoDescriptionRef = useRef();
    const [video, setVideo] = useState("");
    const [videoThumbnail, setVideoThumbnail] = useState("");
    const navigate = useNavigate();
    const [allCategory, setAllCategory] = useState([]);
    const [allVideoData, setAllVideoData] = useState([]);
    const showVideoName = video ? video.name : "Add Video";
    const showVideoThumbnailName = videoThumbnail
        ? videoThumbnail.name
        : "Add video thumbnail";

    const getAllVideos = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/getVideosData`
            );
            setAllVideoData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCategory = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/videoCategoryData`
            );
            setAllCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getAllVideos();
    }, []);

    const handleCategorySelection = (selectedCategory) => {
        setCategory(selectedCategory);
        setListOpen(false);
    };

    const handleVideo = (e) => {
        e.preventDefault();
        setVideo(e.target.files[0]);
    };

    const handleVideoThumbnail = (e) => {
        e.preventDefault();
        setVideoThumbnail(e.target.files[0]);
    };

    const handleVideoDetailsSubmission = async (e) => {
        e.preventDefault();
        const videoTitle = videoTitleRef.current.value;
        const videoDescription = videoDescriptionRef.current.value.replace(/\s+/g," ");
        const checkExistance = allVideoData.find(
            (data) => data.videoTitle.toLowerCase() === videoTitle.toLowerCase()
        );

        if (checkExistance) {
            toast.error("This title is already present", toastOptions);
        } else {
            if (
                videoTitle.trim() &&
                videoDescription.trim() &&
                category &&
                video &&
                videoThumbnail
            ) {
                const formData = new FormData();
                formData.append("videoTitle", videoTitle);
                formData.append("category", category);
                formData.append("videoDescription", videoDescription);
                formData.append("videoURL", video);
                formData.append("videoThumbnailURL", videoThumbnail);

                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_BASE_URL}/addVideo`,
                        formData
                    );
                    const video_id = response.data._id;
                    if (response.status === 201) {
                        toast.success("Video submitted successfully!!", toastOptions);

                        setTimeout(() => {
                            navigate(`/home/create-quiz/${video_id}`, { replace: true });
                            videoTitleRef.current.value = "";
                            videoDescriptionRef.current.value = "";
                            setCategory("Select video Category");
                            setVideo("");
                            setVideoThumbnail("");
                            document.getElementById("videoUpload").value = "";
                            document.getElementById("thumbnailUpload").value = "";
                        }, 1500);
                    } else {
                        toast.error("Error submitting video", toastOptions);
                    }
                } catch (error) {
                    console.log("Error submitting video data", error);
                    toast.error("Error submitting video data", toastOptions);
                }
            } else {
                toast.warn("All fields are mandatory!", toastOptions);
            }
        }
    };

    return (
        <section className="add-video-section   flex justify-center items-center md:w-[100vw] md:min-h-[100vh]">
            <div className="add-video-container bg-white rounded-xl w-[100%] lg:w-[85vw] xl:w-[70vw] mx-auto">
                <PageTab activePage={props.isActivePage} />
                <hr className="font-bold"></hr>
                <form className="w-[100%]" onSubmit={handleVideoDetailsSubmission}>
                    <div className="mx-5 space-y-2 mt-10 md:mx-10">
                        <label
                            htmlFor="video-title"
                            className="text-[#85909B] text-[1rem] font-publicSans"
                        >
                            Video Title
                        </label>
                        <input
                            type="text"
                            className="bg-[#F7F8FB] w-full py-4 px-5 text-xl rounded-xl border-solid border-2 focus:outline-none"
                            id="video-title"
                            placeholder="Add video title"
                            name="videoTitle"
                            ref={videoTitleRef}
                        />
                    </div>
                    <div className="mx-5 space-y-2 mt-10 md:mx-10">
                        <label
                            htmlFor="category"
                            className="text-[#85909B] text-[1rem] font-publicSans"
                        >
                            Choose Category
                        </label>
                        <div className="flex bg-[#F7F8FB] w-full border-solid border-2 rounded-xl">
                            <div className="bg-[#F7F8FB] relative w-full py-4 px-5 text-xl rounded-xl flex justify-between">
                                <div
                                    className="text-[#85909B] text-xl font-publicSans cursor-pointer w-full"
                                    onClick={() => setListOpen((prev) => !prev)}
                                >
                                    {category
                                        ? category?.length > 25
                                            ? category?.substring(0, 25) + "..."
                                            : category
                                        : "Select video Category"}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setListOpen((prev) => !prev);
                                    }}
                                >
                                    {!isListOpen ? (
                                        <VscChevronDown
                                            className="h-8"
                                            size={"1.5rem"}
                                            color={"#747D83"}
                                        />
                                    ) : (
                                        <VscChevronUp
                                            className="h-8"
                                            size={"1.5rem"}
                                            color={"#747D83"}
                                        />
                                    )}
                                </button>
                                {isListOpen && (
                                    <div className="bg-[#F7F8FB] absolute top-24 md:top-20  left-0 flex flex-col items-start rounded-xl p-2 w-full border-solid border-2 h-[17rem]  overflow-y-scroll">
                                        {allCategory.map((items, i) => (
                                            <div
                                                key={i}
                                                className="flex w-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-tranparent hover:border-l-[#85909B] hover:border-l-4"
                                                onClick={() => handleCategorySelection(items.category)}
                                            >
                                                <h3 className="font-semibold text-[#85909B] cursor-pointer">
                                                    {items.category}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mx-5 space-y-2 mt-10 md:mx-10">
                        <label
                            htmlFor="video-title"
                            className="text-[#85909B] text-[1rem] font-publicSans"
                        >
                            Video Description
                        </label>
                        <textarea
                            type="text"
                            className="bg-[#F7F8FB] w-full py-4 px-5 text-xl rounded-xl border-solid border-2 h-[13rem] resize-none focus:outline-none"
                            id="video-description"
                            placeholder="Video description"
                            name="videoDescription"
                            ref={videoDescriptionRef}
                        />
                    </div>
                    <div className="flex flex-col justify-between items-center gap-10 mx-5 mt-5 mb-10 md:flex-row md:mx-10">
                        <div className="flex flex-col gap-5 items-start md:items-center md:flex-row lg:gap-24">
                            <div
                                htmlFor="addVideo"
                                className="flex gap-5 items-center cursor-pointer"
                            >
                                <label
                                    className="text-lg bg-[#D5E6EF] py-2 px-5 rounded-md cursor-pointer"
                                    htmlFor="videoUpload"
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="videoUpload"
                                        name="videoURL"
                                        accept=".mp4, .mkv"
                                        onChange={handleVideo}
                                    />
                                    Browse
                                </label>
                                <span className="text-[#85909B] ">
                                    {video
                                        ? video.name?.length > 15
                                            ? video.name?.substring(0, 15) + "..."
                                            : showVideoName
                                        : showVideoName}
                                </span>
                            </div>
                            <div className="flex gap-5 items-center cursor-pointer">
                                <label
                                    className="text-lg bg-[#D5E6EF] py-2 px-5 rounded-md cursor-pointer"
                                    htmlFor="thumbnailUpload"
                                >
                                    <input
                                        type="file"
                                        className="hidden cursor-pointer"
                                        id="thumbnailUpload"
                                        name="videoThumbnailURL"
                                        accept=".jpg, .png, .svg"
                                        onChange={handleVideoThumbnail}
                                    />
                                    Browse
                                </label>
                                <span className="text-[#85909B]">
                                    {videoThumbnail
                                        ? videoThumbnail.name?.length > 15
                                            ? videoThumbnail.name?.substring(0, 15) + "..."
                                            : showVideoThumbnailName
                                        : showVideoThumbnailName}
                                </span>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="py-4 px-4 md:px-[0.5rem] lg:px-5 bg-[#31A05D] text-white rounded-lg"
                            variant="gradient"
                        >
                            Save & Next
                        </Button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default AddVideo;

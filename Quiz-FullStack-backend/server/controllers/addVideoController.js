import asyncHandler from "express-async-handler";
import videoModel from "../models/addVideoModel.js";

//@desc add video page data
//@route POST /api/admin/addVideo
//@ access public

export const createVideo = asyncHandler(async (request, response) => {
  const { videoTitle, category, videoDescription } = request.body;

  if (!videoTitle || !category || !videoDescription) {
    response.status(400);
    throw new Error("All fields are required");
  }

  const videoURL = request.files["videoURL"][0].path;
  const videoThumbnailURL = request.files["videoThumbnailURL"][0].path;

  const newVideo = await videoModel.create({
    videoTitle,
    category,
    videoDescription,
    videoURL,
    videoThumbnailURL,
  });

  if (newVideo) {
    response.status(201).json(newVideo);
    console.log("Video data saved successfully!!");
  } else {
    console.error("Error saving video data:", error);
    response.status(500);
    throw new Error("An error occurred while saving video data");
  }
});

export const getAllVideo = asyncHandler(async (request, response) => {
  const allVideo = await videoModel.find();
  const images = allVideo.map((items) => items.videoThumbnailURL);
  
  if (allVideo) {
    response.status(201).json({ data: images });
  } else {
    response.status(404);
    throw new Error("Error in gettinng data");
  }
});

export const getVideosData = asyncHandler(async (request, response) => {
  const videosData = await videoModel.find();

  if (videosData) {
    response.status(200).json(videosData);
  } else {
    response.status(404);
    throw new Error("Error in getting Data");
  }
});

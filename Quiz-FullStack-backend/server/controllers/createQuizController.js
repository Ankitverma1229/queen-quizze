import QuizDetail from "../models/createQuizModel.js";
import asyncHandler from "express-async-handler";

export const quizDetails = asyncHandler(async (request, response) => {
  const { quizTitle, quizDuration, videoDescription, emailId } = request.body;
  const video_Id = request.params.id;

  if (quizTitle && quizDuration && videoDescription && emailId && video_Id) {
    const newQuiz = await QuizDetail.create({
      quizTitle,
      quizDuration,
      videoDescription,
      emailId,
      video_Id,
    });

    response.status(201).json(newQuiz);
    console.log("Quiz created successfully");
  } else {
    response.status(404);
    throw new Error("Error in creating quiz");
  }
});

export const populateVideoId = asyncHandler(async (request, response) => {
  const newData = await QuizDetail.find().populate("video_Id");
  if (newData) {
    response.status(200).json({ newData });
  } else {
    response.status(404);
    throw new Error("Error in populating data");
  }
});

import asyncHandler from "express-async-handler";
import AddQuestion from "../models/addQuestionModel.js";

export const addQuestion = asyncHandler(async (request, response) => {
  const { questionAllData } = request.body;
  const quiz_Id = request.params.id;

  if (!questionAllData) {
    response.status(404);
    throw new Error("All fields are mandatory");
  }

  const newQuestion = await AddQuestion.create({
    questionAllData,
    quiz_Id,
  });

  if (newQuestion) {
    response.status(201).json({ _id: newQuestion.id, questionAllData });
  } else {
    response.status(400);
    throw new Error("No data is store");
  }
});

export const populateQuizId = asyncHandler(async (request, response) => {
  const newData = await AddQuestion.find().populate({
    path: "quiz_Id",
    populate: {
      path: "video_Id",
    },
  });
  if (newData) {
    response.status(200).json({ newData });
  } else {
    response.status(404);
    throw new Error("Error in populating data");
  }
});

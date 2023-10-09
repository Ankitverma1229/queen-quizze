import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";

//@desc Store user data
//@route POST /api/admin/userData
//@ access public

export const userData = asyncHandler(async (request, response) => {
  const { name, email, videoTitle, score, totalMarks } = request.body;

  if (!name || !email || !videoTitle || !score || !totalMarks) {
    response.status(401);
    throw new Error("All the data did not come");
  }

  const storedUserData = await UserModel.create({
    name,
    email,
    videoTitle,
    score,
    totalMarks,
  });

  if (storedUserData) {
    response
      .status(201)
      .json({ message: "All data has been stored", storedUserData });
  } else {
    response.status(404);
    throw new Error("Not all data is stored!!");
  }
});

//@desc Get user data
//@route GET /api/admin/getUserData
//@ access public

export const getUserData = asyncHandler(async (request, response) => {
  const userData = await UserModel.find();

  if (userData) {
    response.status(200).json(userData);
  } else {
    response.status(404);
    throw new Error("Error in getting data");
  }
});

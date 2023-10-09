import VideoCategory from "../models/videoCategoryModel.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async (request, response) => {
  const { category } = request.body;

  if (!category) {
    response.status(404);
    throw new Error("All fields are mandatory");
  }
  const checkEistance = await VideoCategory.findOne({ category });
  let newCategory = "";

  if (!checkEistance) {
    newCategory = await VideoCategory.create({ category });
  } else {
    response.status(400);
    throw new Error("Category already Exists");
  }

  if (newCategory) {
    response.status(201).json({ _id: newCategory.id, category });
  } else {
    response.status(400);
    throw new Error("No data is store");
  }
});

export const getCategory = asyncHandler(async (request, response) => {
  const allCategory = await VideoCategory.find({});
  response.send({ status: "ok", data: allCategory });

  if (!allCategory) {
    response
      .status(404)
      .send({ status: "error", message: "Category not found" });
    return;
  }
});

export const delteCategory = asyncHandler(async (request, response) => {
  const id = request.params.id;
  const category = await VideoCategory.findById(id);

  if (!category) {
    response
      .status(404)
      .send({ status: "error", message: "Category not found" });
    return;
  }
  await category.deleteOne();
  response.send({ status: "ok", data: category });
});

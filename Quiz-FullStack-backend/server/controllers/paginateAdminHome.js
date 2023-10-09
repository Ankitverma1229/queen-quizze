import addQuestionModel from "../models/addQuestionModel.js";
import asyncHandler from "express-async-handler";

export const paginateAdmin = asyncHandler(async (req, res) => {
  try {
    const allData = await addQuestionModel.find({}).populate({
      path: "quiz_Id",
      populate: {
        path: "video_Id",
      },
    });

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalUser = allData.length;
    results.pageCount = Math.ceil(allData.length / limit);

    if (lastIndex < allData.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.newData = allData.slice(startIndex, lastIndex);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const paginateQuestion = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const question = await addQuestionModel.findById(_id);

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
    return res.status(400).json({ message: "Invalid page or limit" });
  }

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalUser = question.questionAllData.length;
  results.pageCount = Math.ceil(question.questionAllData.length / limit);

  if (lastIndex < question.questionAllData.length) {
    results.next = {
      page: page + 1,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }

  results.newData = question.questionAllData.slice(startIndex, lastIndex);

  res.json(results);
});

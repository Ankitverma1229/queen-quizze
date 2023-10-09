import mongoose from "mongoose";

const createQuizz = new mongoose.Schema(
  {
    quizTitle: {
      type: String,
      required: true,
    },
    quizDuration: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    video_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("QuizDetail", createQuizz);

import mongoose from "mongoose";

const addQuestionSchema = new mongoose.Schema(
    {
        questionAllData: [
            {
                questionData: {
                    question: String,
                    marks: Number,
                },
                options: [{ optionTitle: String }],
                isRequired: Boolean,
                correctAnswer: Number,
            },
        ],
        quiz_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizDetail",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("AddQuestion", addQuestionSchema);

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please enter any category"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("VideoCategory", categorySchema);

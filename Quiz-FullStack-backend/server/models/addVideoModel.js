import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        videoTitle: String,
        category: String,
        videoDescription: String,
        videoURL: String,
        videoThumbnailURL: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Video", videoSchema);

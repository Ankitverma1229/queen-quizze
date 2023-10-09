import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter admin name"],
        },
        email: {
            type: String,
            required: [true, "Please enter admin email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter pasword"],
        },
        confirmPassword: {
            type: String,
            required: [true, "Please enter confirm password"],
        },
        verifyToken: {
            type: String,
        },
        userType: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Admin", adminSchema);

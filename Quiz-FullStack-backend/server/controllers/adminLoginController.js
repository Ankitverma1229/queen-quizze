import asyncHandler from "express-async-handler";
import adminSchema from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "NOTESAPI";

export const AdminDetails = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const existingAdmin = await adminSchema.findOne({ email: email });

  if (!existingAdmin) {
    response.status(404);
    throw new Error("User not found");
  }

  const matchPassword = await bcrypt.compare(password, existingAdmin.password);

  if (!matchPassword) {
    response.status(400);
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    {
      name: existingAdmin.name,
      email: existingAdmin.email,
      password: password,
      id: existingAdmin._id,
    },
    SECRET_KEY
  );

  response.status(201).json({
    message: "Login successful",
    token,
    userType: existingAdmin.userType,
  });
});

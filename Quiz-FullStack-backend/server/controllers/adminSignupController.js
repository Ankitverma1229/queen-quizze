import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "NOTESAPI";

//@desc Register the admin
//@route POST /api/admin/register
//@ access public

export const registerAdmin = asyncHandler(async (request, response) => {
  const { name, email, password, confirmPassword, userType } = request.body;
  if (!name || !email || !password || !confirmPassword) {
    response.status(404);
    throw new Error("All fields are mandatory!!");
  } else if (password !== confirmPassword) {
    response.status(404);
    throw new Error("Invalid credential");
  }
  const adminAvailable = await Admin.findOne({ email });

  if (adminAvailable) {
    response.status(400);
    throw new Error("Admin is already registered!!");
  }
  let newPassword = password.toString();

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log("Hashed password is: ", hashedPassword);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
    userType
  });

  const token = jwt.sign({ name: admin.name, email: admin.email, id: admin._id }, SECRET_KEY);

  if (admin) {
    if (admin.userType === "Client") {
      response.status(201).json({ _id: admin.id, email: admin.email, token: token, message: "User registered successfully!!" });
    } else {
      response.status(201).json({ _id: admin.id, email: admin.email, token: token, message: "Admin registered successfully!!" });
    }
  } else {
    response.status(400);
    throw new Error("User Data is not valid");
  }
  console.log(`Admin registered: ${admin}`);
});

import asyncHandler from "express-async-handler";
import AdminModel from "../models/adminModel.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const keysecret = process.env.SECRET_KEY;

//@desc forgot password for the admin
//@route POST /api/admin/forgotPassword
//@ access public

const transportor = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const forgotPassword = asyncHandler(async (request, response) => {
  const { email } = request.body;

  const existingAdmin = await AdminModel.findOne({ email: email });

  if (!existingAdmin) {
    response.status(404);
    throw new Error("Admin not found");
  }

  const token = jwt.sign({ _id: existingAdmin._id }, keysecret, {
    expiresIn: "120s",
  });

  const setAdminToken = await AdminModel.findByIdAndUpdate(
    { _id: existingAdmin._id },
    { verifyToken: token },
    { new: true }
  );

  if (setAdminToken) {
    let mailOptions = {};

    if (existingAdmin.userType === "Client") {
      mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Sending email for password reset",
        text: `This link is valid for 2 MINUTES http://localhost:3001/create-new-password/${existingAdmin.id}/${setAdminToken.verifyToken}`,
      };
    } else {
      mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Sending email for password reset",
        text: `This link is valid for 2 MINUTES http://localhost:3000/create-new-password/${existingAdmin.id}/${setAdminToken.verifyToken}`,
      };
    }

    transportor.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        response.status(401);
        throw new Error("Email not send");
      } else {
        console.log("Email sent", info.response);
        response.status(201).json({ message: "Email sent Successfully" });
      }
    });
  }

  response.json({ message: "Email sent Successfully" });
});

//@desc verify admin for forgot password time
//@route get /api/admin/resetPassword
//@ access public

export const resetPassword = asyncHandler(async (request, response) => {
  const { id, token } = request.params;

  try {
    const validAdmin = await AdminModel.findOne({
      _id: id,
      verifyToken: token,
    });
    const verifyingToken = jwt.verify(token, keysecret);

    if (!validAdmin) {
      response.status(404);
      throw new Error("Admin not exist");
    }

    if (validAdmin && verifyingToken._id) {
      response.status(201).json(validAdmin);
    }
  } catch (error) {
    response.status(401);
    throw new Error(error);
  }
});

//@desc update new password
//@route post /api/admin/updatePassword
//@ access public

export const updatePassword = asyncHandler(async (request, response) => {
  const { id, token } = request.params;
  const { password } = request.body;

  try {
    const validAdmin = await AdminModel.findOne({
      _id: id,
      verifyToken: token,
    });

    if (!validAdmin) {
      response.status(404);
      throw new Error("Admin not found");
    }

    const verifyingToken = jwt.verify(token, keysecret);

    if (validAdmin && verifyingToken._id) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await AdminModel.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword }
      );

      response.status(201).json({ message: "Password updated successfully" });
    } else {
      response.status(401);
      throw new Error("Admin not authorized");
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    throw new Error("Internal server error");
  }
});

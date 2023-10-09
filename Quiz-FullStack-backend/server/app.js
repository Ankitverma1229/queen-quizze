import express from "express";
import router from "./routes/adminRouter.js";
import { errorHandle } from "./middleware/errorHandler.js";
import cors from "cors";
import path from "path";

export const app = express();

let parentDir = path.resolve(process.cwd(), ".");

app.use("/public", express.static(path.join(parentDir, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use("/api/admin", router);
app.use(errorHandle);

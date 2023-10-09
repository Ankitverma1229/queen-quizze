import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";
import { app } from "./app.js";

dotenv.config();
connectDb();

const port = process.env.PORT || 7700;

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is listen port ${port}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

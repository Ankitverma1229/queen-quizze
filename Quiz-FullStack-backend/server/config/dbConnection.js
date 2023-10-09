import mongoose from "mongoose";

export const connectDb = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const connect = await mongoose.connect(process.env.CONNECT_DB, connectionParams);
    console.log(
      "Database Connected :",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    console.log("Database connection failed!!");
    process.exit(1);
  }
};

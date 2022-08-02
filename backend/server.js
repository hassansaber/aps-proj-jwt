const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
userRouter = require("./routes/user.route");
//-----------------

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("HOME");
});

//-------server
const PORT = 8000;

const server = async () => {
  try {
    // console.log(process.env);
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

server();

//x1zHO6XydfyEjFhK

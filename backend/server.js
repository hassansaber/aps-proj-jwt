const express = require("express");
const app = express();
const connectDB = require("./connectDB/connect");
require("dotenv").config();
//-----
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME");
});

//-------
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

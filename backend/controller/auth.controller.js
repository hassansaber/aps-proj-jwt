const AuthModel = require("../model/auth.model");

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
//--------------

// SIGN UP
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  //validator error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //email check
    const oldUser = await AuthModel.findOne({ email });
    if (oldUser) return res.status(422).json({ message: "user already exist" });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create userAuth
    const userAuthNew = new AuthModel({
      username,
      email,
      password: hashedPassword,
    });
    const userAuthResult = await userAuthNew.save();

    //JWT
    const token = JWT.sign(
      { email: userAuthResult.email },
      process.env.SECRET_TOKEN_SIGN,
      {
        expiresIn: "5d",
      }
    );
    return res.status(201).json({ userAuthResult, token });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

//LOG IN
const logIn = async (req, res) => {
  const { username, email, password } = req.body;

  //validator error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //email check
    const oldUser = await AuthModel.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "user not found" });

    //decode password and check
    const hashedPassword = await bcrypt.compare(password, oldUser.password);
    if (!hashedPassword)
      return res.status(401).json({ message: "wrong credentials" });

    //access token
    //verify token
    const accessToken = JWT.sign(
      { email: oldUser.email },
      process.env.SECRET_TOKEN_SIGN,
      {
        expiresIn: "5d",
      }
    );
    return res.status(200).json({ oldUser, accessToken });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

//--------
module.exports = {
  signUp,
  logIn,
};

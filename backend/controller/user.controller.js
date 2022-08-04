const UserModel = require("../model/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//CRUD
// save()  === add to DB
//Create
const createUser = async (req, res) => {
  //middleWare error
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //-
  try {
    const { password, name, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userNew = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const usrResult = await userNew.save();
    res.status(201).json(usrResult);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//CRUD
// .find({}) === list of data of document
//Read
const readUsers = async (req, res) => {
  try {
    const userslist = await UserModel.find({});
    res.status(200).json(userslist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//CRUD
//Update
const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        //replace all new users with requested new data
        $set: req.body,
      },
      {
        //if true, return the modified document rather than the original
        new: true,

        // if true, runs update validators on this command.
        // Update validators validate the
        // update operation against the model's schema
        runValidators: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send("user has been deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
};

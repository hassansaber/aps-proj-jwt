const {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

const router = require("express").Router();

//Create
router.post("/new", createUser);

//Update
router.put("/:id", updateUser);

//Read
router.get("/", readUsers);

//Delete
router.delete("/:id", deleteUser);
module.exports = router;

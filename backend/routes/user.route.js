const {
  createUser,
  readUsers,
  updateUser,
} = require("../controller/user.controller");

const router = require("express").Router();

//Create
router.post("/register", createUser);

//Update
router.put("/:id", updateUser);

router.get("/", readUsers);

module.exports = router;

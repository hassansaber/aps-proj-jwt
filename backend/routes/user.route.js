const {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const { check } = require("express-validator");

const router = require("express").Router();

//Create
router.post(
  "/new",
  [
    check("email", "Email is not valid").isEmail(),
    // isStrongPassword === { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    check("password", "Password is not Strong").isStrongPassword(),
  ],
  createUser
);

//Update
router.put("/:id", updateUser);

//Read
router.get("/", readUsers);

//Delete
router.delete("/:id", deleteUser);
module.exports = router;

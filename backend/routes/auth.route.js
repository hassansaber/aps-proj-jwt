const router = require("express").Router();
const { check } = require("express-validator");
const { signUp, logIn } = require("../controller/auth.controller");

//---
//new user
router.post(
  "/register",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is not Strong").isStrongPassword(),
  ],
  signUp
);

//log in old user
router.post(
  "/login",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is not Strong").isStrongPassword(),
  ],
  logIn
);

//-----
module.exports = router;

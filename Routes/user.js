const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  loginRules,
  registerRules,
  valaidaaation,
} = require("../midddleware/validator");
const isAuth = require("../midddleware/passport");

//register
router.post("/register", registerRules(), valaidaaation, async (req, res) => {
  const { name, lastname, email, password ,isAdmin} = req.body;
  try {
    const newUser = new user({ name, lastname, email, password,isAdmin });

    // check if the email exist
    const searchedUser = await user.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "email already exist" });
    }

    // password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    let hashedPassword = await bcrypt.hash(password, genSalt);

    newUser.password = hashedPassword;
    // generate the user

    // save the user

    const newusertocken = await newUser.save();
    const payload = {
      _id: newUser._id,
      name: newusertocken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res.status(200).send({
      user: newusertocken,
      msg: "User is saved",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).send("can not save the user");
  }
});

//login
router.post("/login", loginRules(), valaidaaation, async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user exist
    const searchedUser = await user.findOne({ email });
    //if the email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "bad credential" });
    }
    //password are equals
    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "bad credential" });
    }

    /// tocken
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    //send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "suceess", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ msg: "can not get the user " });
  }
});

router.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});

//update user
router.put("/:id", async (req, res) => {
  try {
    let result = await user.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    result.modifiedCount
      ? res.status(200).send({ message: "user update" })
      : res.status(200).send({ message: "user already updated" });
  } catch (error) {
    res.status(500).send("not update");
    console.log(error);
  }
});
// get one user
router.get("/:id", async (req, res) => {
  try {
    let result = await user.findOne({ _id: req.params.id });
    res.status(200).send({ reponse: result, message: "getted one user" });
  } catch (error) {
    res.status(500).send("can not get this user");
  }
});
//Get all user
router.get("/", async (req, res) => {
  try {
    let result = await user.find();
    res.send({ reponse: result, message: "getted all user" });
  } catch (error) {
    res.status(400).send("can not get user");
  }
});

module.exports = router;

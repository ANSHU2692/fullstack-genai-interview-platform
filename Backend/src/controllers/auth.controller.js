const { model } = require("mongoose");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const tokenBlacklistModel = require("../models/blacklist.models");

/**
 * @name registerUserController
 * @description register a new user , expects username ,email and password in the request body
 * @access public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    /* isUserAlreadyExists.username == username */
    return res.status(400).json({
      message: "Account already exists with this email or username",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // res.cookie("token", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(201).json({
    message: "User registred sucessfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login a user , expects a username and password in req body
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: " Invalid Password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // res.cookie("token", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    message: "User loggedIn sucessfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name logoutUserController
 * @discription clear token fron user cookies and add token to blacklist
 * @access public
 */

async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  // res.clearCookie("token");

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    message: "User logged out sucessfully",
  });
}

/**
 * @name getMEController
 * @description get the current loggedin  user details
 * @access private
 */

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User detail fetch sucessfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};

import { sendResponse } from "../utils";
const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

const signup = async function (req, res) {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.status(200).json({
      message: "User Added successfully",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "User Not Added!",
      error: err?.errors[0]?.message,
    });
  }
};

const login = async function (req, res) {
  try {
    let data = req.body;
    let email = data.email;
    let password = data.password;
    let user = await User.findOne({ where: { email: email } });
    if (user === null) {
      return res.status(404).json({
        message: "Email does not exist",
        status: false,
      });
    } else if (email === user.email && password === user.password) {
      var token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({
        message: "logged in !",
        status: true,
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "check your email and password",
        status: false,
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: "User Not Found",
      err,
    });
  }
};

const sayHello = async function (req, res) {
  return res.status(200).json({
    message: "Working Success",
  });
};

export { signup, sayHello, login };

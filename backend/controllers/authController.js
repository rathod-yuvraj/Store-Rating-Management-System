const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      address
    } = req.body;

    const existing =
      await User.findOne({
        where: { email }
      });

    if (existing) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    const hash =
      await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
      address,
      role: "USER"
    });

    res.status(201).json({
      message: "Registered Successfully"
    });

  } catch (err) {

    res.status(500).json(err);

  }
};

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        where: { email }
      });

    if (!user)
      return res.status(400).json({
        message: "Invalid Credentials"
      });

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid)
      return res.status(400).json({
        message: "Invalid Credentials"
      });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      role: user.role,
      userId: user.id
    });

  } catch (err) {

    res.status(500).json(err);

  }
};

exports.changePassword = async (
  req,
  res
) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user =
      await User.findByPk(
        req.user.id
      );

    const valid =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!valid)
      return res.status(400).json({
        message:
          "Old Password Incorrect"
      });

    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await user.save();

    res.json({
      message:
        "Password Updated"
    });

  } catch (err) {

    res.status(500).json(err);

  }
};
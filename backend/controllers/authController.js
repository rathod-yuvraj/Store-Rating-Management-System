const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  User
} = require("../models");



const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRE
    }
  );
};



exports.register =
async (req, res) => {

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
        message:
          "Email already exists"
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    if (
      !passwordRegex.test(
        password
      )
    ) {
      return res.status(400).json({
        message:
          "Password must contain uppercase and special character"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({

        name,
        email,

        password:
          hashedPassword,

        address,

        role: "USER"
      });

    res.status(201).json({
      message:
        "Registration Successful",
      token:
        generateToken(user.id)
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};



exports.login =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        where: { email }
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    res.json({

      token:
        generateToken(user.id),

      user: {

        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};



exports.changePassword =
async (req, res) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user =
      await User.findByPk(
        req.user.id
      );

    const match =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message:
          "Old password incorrect"
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    if (
      !passwordRegex.test(
        newPassword
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid new password format"
      });
    }

    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await user.save();

    res.json({
      message:
        "Password Updated Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};
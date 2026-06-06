const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const {
  User,
  Store,
  Rating
} = require("../models");

/*
=================================
Dashboard
=================================
*/

exports.dashboard = async (req, res) => {

  try {

    const totalUsers =
      await User.count();

    const totalStores =
      await Store.count();

    const totalRatings =
      await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/*
=================================
Add User
=================================
*/

exports.addUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const exists =
      await User.findOne({
        where: { email }
      });

    if (exists)
      return res.status(400).json({
        message: "Email already exists"
      });

    const hash =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password: hash,
        address,
        role
      });

    res.status(201).json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/*
=================================
Add Store
=================================
*/

exports.addStore = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      address,
      ownerId
    } = req.body;

    const store =
      await Store.create({
        name,
        email,
        address,
        ownerId
      });

    res.status(201).json(store);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/*
=================================
Users Listing
=================================
*/

exports.getUsers = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      address,
      role,
      sort = "name",
      order = "ASC"
    } = req.query;

    const users =
      await User.findAll({

        where: {

          ...(name && {
            name: {
              [Op.like]:
                `%${name}%`
            }
          }),

          ...(email && {
            email: {
              [Op.like]:
                `%${email}%`
            }
          }),

          ...(address && {
            address: {
              [Op.like]:
                `%${address}%`
            }
          }),

          ...(role && {
            role
          })
        },

        order: [
          [sort, order]
        ]
      });

    res.json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/*
=================================
User Details
=================================
*/

exports.getUserDetails =
async (req, res) => {

  try {

    const user =
      await User.findByPk(
        req.params.id
      );

    if (!user)
      return res.status(404).json({
        message: "User not found"
      });

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/*
=================================
Stores Listing
=================================
*/

exports.getStores =
async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      sort = "name",
      order = "ASC"
    } = req.query;

    const stores =
      await Store.findAll({

        where: {

          ...(name && {
            name: {
              [Op.like]:
                `%${name}%`
            }
          }),

          ...(email && {
            email: {
              [Op.like]:
                `%${email}%`
            }
          }),

          ...(address && {
            address: {
              [Op.like]:
                `%${address}%`
            }
          })
        },

        order: [
          [sort, order]
        ]
      });

    res.json(stores);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};
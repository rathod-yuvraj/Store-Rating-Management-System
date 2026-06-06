const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const {
  User,
  Store,
  Rating
} = require("../models");



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

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



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

    if (exists) {
      return res.status(400).json({
        message: "Email already exists"
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
        role
      });

    res.status(201).json({
      message:
        "User Created Successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



exports.addStore = async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      ownerId
    } = req.body;

    const owner =
      await User.findByPk(
        ownerId
      );

    if (
      !owner ||
      owner.role !== "STORE_OWNER"
    ) {
      return res.status(400).json({
        message:
          "Invalid Store Owner"
      });
    }

    const store =
      await Store.create({

        name,
        email,
        address,
        ownerId
      });

    res.status(201).json({
      message:
        "Store Created Successfully",
      store
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



exports.getUsers = async (req, res) => {

  try {

    const {
      page = 1,
      limit = 10,
      name,
      email,
      role,
      sort = "name",
      order = "ASC"
    } = req.query;

    const users =
      await User.findAndCountAll({

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

          ...(role && {
            role
          })
        },

        attributes: {
          exclude: ["password"]
        },

        limit:
          Number(limit),

        offset:
          (page - 1) * limit,

        order: [
          [sort, order]
        ]
      });

    res.json({

      total:
        users.count,

      page:
        Number(page),

      totalPages:
        Math.ceil(
          users.count /
          limit
        ),

      users:
        users.rows
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};



exports.getUserDetails =
async (req, res) => {

  try {

    const user =
      await User.findByPk(
        req.params.id,
        {
          attributes: {
            exclude: ["password"]
          }
        }
      );

    if (!user) {

      return res.status(404).json({
        message:
          "User not found"
      });

    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};



exports.getStores =
async (req, res) => {

  try {

    const {
      page = 1,
      limit = 10,
      name,
      email,
      address,
      sort = "name",
      order = "ASC"
    } = req.query;

    const stores =
      await Store.findAndCountAll({

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

        include: [
          {
            model: User,
            as: "owner",
            attributes: [
              "id",
              "name",
              "email"
            ]
          }
        ],

        limit:
          Number(limit),

        offset:
          (page - 1) * limit,

        order: [
          [sort, order]
        ]
      });

    res.json({

      total:
        stores.count,

      page:
        Number(page),

      totalPages:
        Math.ceil(
          stores.count /
          limit
        ),

      stores:
        stores.rows
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};
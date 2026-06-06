const { Op } = require("sequelize");

const {
  User,
  Store,
  Rating
} = require("../models");



exports.getAllStores =
async (req, res) => {

  try {

    const {
      page = 1,
      limit = 10
    } = req.query;

    const stores =
      await Store.findAndCountAll({

        include: [
          {
            model: Rating,
            attributes: ["rating"]
          }
        ],

        limit:
          Number(limit),

        offset:
          (page - 1) * limit
      });

    const response =
      stores.rows.map(store => {

        const ratings =
          store.Ratings || [];

        const averageRating =
          ratings.length > 0
            ? (
                ratings.reduce(
                  (sum, r) =>
                    sum + r.rating,
                  0
                ) / ratings.length
              ).toFixed(2)
            : "0.00";

        return {

          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,
          averageRating
        };
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
        response
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

exports.ownerDashboard =
async (req, res) => {

  try {

    const store =
      await Store.findOne({

        where: {
          ownerId:
            req.user.id
        }
      });

    if (!store) {

      return res.status(404).json({
        message:
          "Store not found"
      });

    }

    const ratings =
      await Rating.findAll({

        where: {
          StoreId:
            store.id
        },

        include: [
          {
            model: User,
            attributes: [
              "id",
              "name",
              "email"
            ]
          }
        ]
      });

    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce(
              (sum, r) =>
                sum + r.rating,
              0
            ) / ratings.length
          ).toFixed(2)
        : "0.00";

    res.json({

      storeId:
        store.id,

      storeName:
        store.name,

      averageRating,

      totalRatings:
        ratings.length,

      ratings
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

/*
=================================
Search Stores
=================================
*/

exports.searchStore =
async (req, res) => {

  try {

    const {
      name,
      address,
      page = 1,
      limit = 10
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

          ...(address && {
            address: {
              [Op.like]:
                `%${address}%`
            }
          })
        },

        include: [
          {
            model: Rating,
            attributes: ["rating"]
          }
        ],

        limit:
          Number(limit),

        offset:
          (page - 1) * limit
      });

    const response =
      stores.rows.map(store => {

        const ratings =
          store.Ratings || [];

        const averageRating =
          ratings.length > 0
            ? (
                ratings.reduce(
                  (sum, r) =>
                    sum + r.rating,
                  0
                ) / ratings.length
              ).toFixed(2)
            : "0.00";

        return {

          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,
          averageRating
        };
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
        response
    });

  } catch (error) {const { Op } = require("sequelize");

const {
  User,
  Store,
  Rating
} = require("../models");

/*
=================================
Get All Stores
=================================
*/
exports.getAllStores = async (req, res) => {
   // code
};

/*
=================================
Search Stores
=================================
*/
exports.searchStore = async (req, res) => {
   // paste searchStore code here
};

/*
=================================
Store Owner Dashboard
=================================
*/
exports.ownerDashboard = async (req, res) => {
   // paste ownerDashboard code here
};

    res.status(500).json({
      message:
        error.message
    });

  }
};
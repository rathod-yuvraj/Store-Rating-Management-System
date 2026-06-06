const {
  User,
  Store,
  Rating
} = require("../models");

/*
=================================
All Stores
=================================
*/

exports.getAllStores =
async (req, res) => {

  try {

    const stores =
      await Store.findAll({
        include: [Rating]
      });

    const response =
      stores.map(store => {

        let avg = 0;

        if (
          store.Ratings &&
          store.Ratings.length > 0
        ) {

          avg =
            store.Ratings.reduce(
              (sum, r) =>
                sum + r.rating,
              0
            ) /
            store.Ratings.length;
        }

        return {
          id: store.id,
          name: store.name,
          address: store.address,
          averageRating:
            avg.toFixed(1)
        };
      });

    res.json(response);

  } catch (err) {

    res.status(500).json({
      message: err.message
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
      Op
    } = require("sequelize");

    const {
      name,
      address
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

          ...(address && {
            address: {
              [Op.like]:
                `%${address}%`
            }
          })
        }
      });

    res.json(stores);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/*
=================================
Store Owner Dashboard
=================================
*/

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

    if (!store)
      return res.status(404).json({
        message:
          "Store not assigned"
      });

    const ratings =
      await Rating.findAll({

        where: {
          StoreId: store.id
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

    let avg = 0;

    if (ratings.length > 0) {

      avg =
        ratings.reduce(
          (sum, r) =>
            sum + r.rating,
          0
        ) /
        ratings.length;
    }

    res.json({

      storeName:
        store.name,

      averageRating:
        avg.toFixed(2),

      ratings
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};
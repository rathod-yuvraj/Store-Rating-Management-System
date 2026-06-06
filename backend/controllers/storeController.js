
const { Op } = require("sequelize");
const {
  User,
  Store,
  Rating
} = require("../models");

/*

Helper Function

*/
const getAverageRating = (ratings = []) => {
  if (!ratings.length) return "0.00";

  const total = ratings.reduce(
    (sum, rating) => sum + rating.rating,
    0
  );

  return (total / ratings.length).toFixed(2);
};

/*
-----------------------------------
Get All Stores
-----------------------------------
*/
exports.getAllStores = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const stores = await Store.findAndCountAll({
      include: [
        {
          model: Rating,
          attributes: ["rating", "UserId"]
        }
      ],
      order: [["name", "ASC"]],
      limit,
      offset: (page - 1) * limit
    });

    const response = stores.rows.map((store) => ({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      overallRating: getAverageRating(store.Ratings),
      userSubmittedRating:
        store.Ratings.find(
          (rating) => rating.UserId === req.user.id
        )?.rating || null
    }));

    res.status(200).json({
      success: true,
      total: stores.count,
      page,
      totalPages: Math.ceil(stores.count / limit),
      stores: response
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/*
-----------------------------------
Search Stores
-----------------------------------
*/
exports.searchStore = async (req, res) => {
  try {
    const { name, address } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}%`
      };
    }

    if (address) {
      whereClause.address = {
        [Op.like]: `%${address}%`
      };
    }

    const stores = await Store.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Rating,
          attributes: ["rating", "UserId"]
        }
      ],
      order: [["name", "ASC"]],
      limit,
      offset: (page - 1) * limit
    });

    const response = stores.rows.map((store) => ({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      overallRating: getAverageRating(store.Ratings),
      userSubmittedRating:
        store.Ratings.find(
          (rating) => rating.UserId === req.user.id
        )?.rating || null
    }));

    res.status(200).json({
      success: true,
      total: stores.count,
      page,
      totalPages: Math.ceil(stores.count / limit),
      stores: response
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/*
-----------------------------------
Store Owner Dashboard
-----------------------------------
*/
exports.ownerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id
      }
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    const ratings = await Rating.findAll({
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

    res.status(200).json({
      success: true,
      storeId: store.id,
      storeName: store.name,
      averageRating: getAverageRating(ratings),
      totalRatings: ratings.length,
      users: ratings.map((rating) => ({
        userId: rating.User.id,
        name: rating.User.name,
        email: rating.User.email,
        rating: rating.rating
      }))
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

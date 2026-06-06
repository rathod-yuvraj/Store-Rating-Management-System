
const {
  Rating,
  Store,
  User
} = require("../models");

/*
--------------------------------
Helper Function
--------------------------------
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
--------------------------------
Submit / Update Rating
--------------------------------
*/
exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Store ID and rating are required"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        UserId: req.user.id,
        StoreId: storeId
      }
    });

    if (existingRating) {
      existingRating.rating = rating;

      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: "Rating updated successfully"
      });
    }

    await Rating.create({
      rating,
      UserId: req.user.id,
      StoreId: storeId
    });

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully"
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
--------------------------------
My Ratings
--------------------------------
*/
exports.myRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: {
        UserId: req.user.id
      },
      include: [
        {
          model: Store,
          attributes: [
            "id",
            "name",
            "address"
          ]
        }
      ],
      order: [
        ["createdAt", "DESC"]
      ]
    });

    const response = ratings.map((rating) => ({
      ratingId: rating.id,
      rating: rating.rating,
      store: {
        id: rating.Store.id,
        name: rating.Store.name,
        address: rating.Store.address
      }
    }));

    res.status(200).json({
      success: true,
      total: ratings.length,
      ratings: response
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
--------------------------------
Store Ratings
--------------------------------
*/
exports.storeRatings = async (req, res) => {
  try {
    const store = await Store.findByPk(
      req.params.storeId
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    const ratings = await Rating.findAll({
      where: {
        StoreId: req.params.storeId
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
      ],
      order: [["createdAt", "DESC"]]
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

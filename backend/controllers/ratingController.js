const {
  Rating,
  Store,
  User
} = require("../models");



exports.submitRating =
async (req, res) => {

  try {

    const {
      storeId,
      rating
    } = req.body;

   

    if (
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message:
          "Rating must be between 1 and 5"
      });
    }

  

    const store =
      await Store.findByPk(
        storeId
      );

    if (!store) {

      return res.status(404).json({
        message:
          "Store not found"
      });

    }

  

    let existingRating =
      await Rating.findOne({

        where: {

          UserId:
            req.user.id,

          StoreId:
            storeId
        }
      });

   

    if (existingRating) {

      existingRating.rating =
        rating;

      await existingRating.save();

      return res.json({
        message:
          "Rating Updated Successfully"
      });

    }

   

    await Rating.create({

      rating,

      UserId:
        req.user.id,

      StoreId:
        storeId
    });

    res.status(201).json({
      message:
        "Rating Submitted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};


/*

My Ratings

*/
exports.myRatings =
async (req, res) => {

  try {

    const ratings =
      await Rating.findAll({

        where: {
          UserId:
            req.user.id
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

    res.json(ratings);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};


/*

Store Ratings

*/

exports.storeRatings =
async (req, res) => {

  try {

    const store =
      await Store.findByPk(
        req.params.storeId
      );

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
            req.params.storeId
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
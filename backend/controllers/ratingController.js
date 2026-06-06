const {
  Rating,
  Store
} = require("../models");

/*
=================================
Submit / Update Rating
=================================
*/

exports.submitRating =
async (req, res) => {

  try {

    const {
      storeId,
      rating
    } = req.body;

    const store =
      await Store.findByPk(
        storeId
      );

    if (!store)
      return res.status(404).json({
        message:
          "Store not found"
      });

    let existing =
      await Rating.findOne({

        where: {

          UserId:
            req.user.id,

          StoreId:
            storeId
        }
      });

    if (existing) {

      existing.rating =
        rating;

      await existing.save();

      return res.json({
        message:
          "Rating Updated"
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
        "Rating Submitted"
    });

  } catch (err) {

    res.status(500).json({
      message:
        err.message
    });

  }
};
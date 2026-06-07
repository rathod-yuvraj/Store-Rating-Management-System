const { Rating, Store, User } = require("../models");



/*
====================================
Submit Rating
====================================
*/

exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
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
        userId,
        storeId
      }
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this store"
      });
    }

    const newRating = await Rating.create({
      userId,
      storeId,
      rating
    });

    return res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      data: newRating
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
};



/*
====================================
Update Rating
====================================
*/

exports.updateRating = async (req, res) => {

  try {

    const userId = req.user.id;

    const { storeId } = req.params;

    const { rating } = req.body;

    if (rating < 1 || rating > 5) {

      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });

    }

    const existingRating = await Rating.findOne({
      where: {
        userId,
        storeId
      }
    });

    if (!existingRating) {

      return res.status(404).json({
        success: false,
        message: "Rating not found"
      });

    }

    existingRating.rating = rating;

    await existingRating.save();

    return res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: existingRating
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



/*
====================================
My Ratings
====================================
*/

exports.myRatings = async (req, res) => {

  try {

    const userId = req.user.id;

    const ratings = await Rating.findAll({

      where: {
        userId
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
      ]

    });

    return res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



/*
====================================
Store Ratings
====================================
*/

exports.storeRatings = async (req, res) => {

  try {

    const { storeId } = req.params;

    const store = await Store.findByPk(storeId);

    if (!store) {

      return res.status(404).json({
        success: false,
        message: "Store not found"
      });

    }

    const ratings = await Rating.findAll({

      where: {
        storeId
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

    return res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};
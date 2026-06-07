const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const {
  User,
  Store,
  Rating
} = require("../models");

const getAverageRating = (ratings = []) => {
  if (!ratings.length) return null;

  const total = ratings.reduce(
    (sum, rating) => sum + rating.rating,
    0
  );

  return Number(total / ratings.length).toFixed(1);
};


/*
=========================================
Get All Stores
=========================================
*/

exports.getStores = async (req, res) => {
  try {
    const { name, address } = req.query;

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

    const stores = await Store.findAll({
      where: whereClause,
      include: [
        {
          model: Rating,
          attributes: ["rating", "UserId"]
        }
      ],
      order: [["name", "ASC"]]
    });

    const response = stores.map((store) => ({
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
      stores: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/*
=========================================
Get Dashboard
=========================================
*/

exports.getDashboard = async (req, res) => {
  try {
    const totalStores = await Store.count();
    const myRatings = await Rating.count({
      where: { UserId: req.user.id }
    });

    return res.status(200).json({
      totalStores,
      myRatings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/*
=========================================
Get Profile
=========================================
*/

exports.getProfile = async (req, res) => {
  try {
    const { id, name, email, address, role } = req.user;

    return res.status(200).json({
      id,
      name,
      email,
      address,
      role
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/*
=========================================
Submit Rating
=========================================
*/

exports.submitRating = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      storeId,
      rating
    } = req.body;

    if (rating < 1 || rating > 5) {

      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 1 and 5"
      });

    }

    const store =
      await Store.findByPk(storeId);

    if (!store) {

      return res.status(404).json({
        success: false,
        message: "Store not found"
      });

    }

    const existingRating =
      await Rating.findOne({
        where: {
          UserId: userId,
          StoreId: storeId
        }
      });

    if (existingRating) {

      return res.status(400).json({
        success: false,
        message:
          "Rating already exists. Use update rating API."
      });

    }

    const newRating =
      await Rating.create({
        UserId: userId,
        StoreId: storeId,
        rating
      });

    res.status(201).json({
      success: true,
      message:
        "Rating submitted successfully",
      data: newRating
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
=========================================
Update Rating
=========================================
*/

exports.updateRating = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      storeId
    } = req.params;

    const {
      rating
    } = req.body;

    if (rating < 1 || rating > 5) {

      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 1 and 5"
      });

    }

    const existingRating =
      await Rating.findOne({
        where: {
          UserId: userId,
          StoreId: storeId
        }
      });

    if (!existingRating) {

      return res.status(404).json({
        success: false,
        message:
          "Rating not found"
      });

    }

    existingRating.rating = rating;

    await existingRating.save();

    res.status(200).json({
      success: true,
      message:
        "Rating updated successfully",
      data: existingRating
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
=========================================
My Ratings
=========================================
*/

exports.myRatings = async (req, res) => {

  try {

    const ratings =
      await Rating.findAll({
        where: {
          UserId: req.user.id
        },
        include: [
          {
            model: Store
          }
        ]
      });

    res.status(200).json({
      success: true,
      data: ratings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
=========================================
Change Password
=========================================
*/

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

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          success: false,
          message:
            "Old password is incorrect"
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Password updated successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };
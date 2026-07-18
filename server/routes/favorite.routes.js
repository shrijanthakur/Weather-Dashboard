const { Router } = require("express");
const { Favorite } = require("../models/favorite.model.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");
const { User } = require("../models/user.model.js");

const router = Router();


router.post("/", verifyJWT, asyncHandler(async (req, res) => {
  const { city, lat, lon } = req.body;
  if (!city || lat === undefined || lon === undefined) {
    throw new ApiError(400, "city, lat, and lon are required");
  }

  const favorite = await Favorite.create({ userId: req.user._id, city, lat, lon });
  return res.status(201).json(new ApiResponse(201, favorite, "Favorite added"));
}));

router.get("/", verifyJWT, asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user._id });
  return res.status(200).json(new ApiResponse(200, favorites, "Favorites fetched"));
}));

router.delete("/:id", verifyJWT, asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!favorite) throw new ApiError(404, "Favorite not found");
  return res.status(200).json(new ApiResponse(200, {}, "Favorite removed"));
}));

router.get("/user/:username", asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username.toLowerCase() });
  if (!user) throw new ApiError(404, "User not found");

  const favorites = await Favorite.find({ userId: user._id });
  return res.status(200).json(
    new ApiResponse(200, { user: { username: user.username, fullName: user.fullName }, favorites }, "Favorites fetched")
  );
}));

module.exports = router;
const { Router } = require("express");
const { Favorite } = require("../models/favorite.model.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");

const router = Router();

// Add a favorite
router.post("/", verifyJWT, asyncHandler(async (req, res) => {
  const { city, lat, lon } = req.body;
  if (!city || lat === undefined || lon === undefined) {
    throw new ApiError(400, "city, lat, and lon are required");
  }

  const favorite = await Favorite.create({ userId: req.user._id, city, lat, lon });
  return res.status(201).json(new ApiResponse(201, favorite, "Favorite added"));
}));

// Get all favorites for the logged-in user
router.get("/", verifyJWT, asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user._id });
  return res.status(200).json(new ApiResponse(200, favorites, "Favorites fetched"));
}));

// Remove a favorite
router.delete("/:id", verifyJWT, asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!favorite) throw new ApiError(404, "Favorite not found");
  return res.status(200).json(new ApiResponse(200, {}, "Favorite removed"));
}));

module.exports = router;
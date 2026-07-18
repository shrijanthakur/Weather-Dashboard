const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    city: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = { Favorite };
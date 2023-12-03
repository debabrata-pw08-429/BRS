const mongoose = require("mongoose");
const Review = require("./review.model");

const brewerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address_1: String,
  address_2: String,
  address_3: String,
  brewery_type: String,
  country: String,
  postal_code: String,
  street: String,
  phone: String,
  website_url: String,
  current_rating: Number, // You can calculate and update this based on reviews
  state: String,
  city: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Brewery = mongoose.model("Brewery", brewerySchema);
module.exports = Brewery;

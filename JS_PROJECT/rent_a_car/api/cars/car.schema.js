const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
  brand: {
    type: String,
    unique: false,
    required: true,
  },
  model: {
    type: String,
    unique: false,
    required: true,
  },
  price: {
    type: Number,
    unique: false,
    required: true,
  },
  year: {
    type: Number,
    unique: false,
    required: true,
  },
  doors: {
    type: Number,
    unique: false,
    required: true,
  },
  seats: {
    type: Number,
    unique: false,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    unique: false,
    required: true,
  },
  rentedBy: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = carSchema;

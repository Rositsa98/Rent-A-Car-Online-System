const mongoose = require("mongoose");
let carSchema = require("./car.schema");

carSchema.statics = {
  create: function (data, cb) {
    let car = new this(data);
    car.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getCarById: function (query, cb) {
    this.findOne(query, cb);
  },

  getCarsForUser: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

let carModel = mongoose.model("Cars", carSchema);
module.exports = carModel;

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const counterSchema = new schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});

module.exports = mongoose.model("counter", counterSchema);

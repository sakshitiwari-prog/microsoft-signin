const mongoose = require("mongoose");
const schema = mongoose.Schema;

const quoteSchema = new schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  quoteHistory: {
    type: {},
  },
});

module.exports = mongoose.model("quotes", quoteSchema);

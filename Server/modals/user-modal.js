const mongoose = require("mongoose");
const schema = mongoose.Schema;
var secretKey = "$wne7823@#$5nsjnd@@%%$#@#$";
var jwt = require("jsonwebtoken");
const userSchema = new schema({
  userId: {
    type: Number,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});
userSchema.methods.generateToken = function (userData) {
  // Create a payload containing user information
  const payload = {
    userData,
    // Other relevant user data...
  };

  // Sign the payload with a secret key to generate JWT
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

module.exports = mongoose.model("user", userSchema);

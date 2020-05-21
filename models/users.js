const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    city: {
      type: String,
      required: true,
      minlength: 4,
    },
    vehicle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
  },
  { timestamps: true }
);
const User = mongoose.model("users", UserSchema);
module.exports = User;

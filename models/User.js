const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Cannot be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: [true, "Cannot be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      unique: true,
      index: true
    },
    password: {
      type: String
    }
  },
  {timestamps: true}
);

UserSchema.plugin(uniqueValidator, {
  message: "Is already taken."
});

module.exports = mongoose.model("User", UserSchema);

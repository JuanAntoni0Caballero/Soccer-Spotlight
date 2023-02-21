const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      // match: /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{4,0}/
    },
    birthday: {
      type: Date,
      default: Date.now()
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'mod'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/709/709618.png'
    },
    dreamTeam: {
      type: Schema.Types.ObjectId,
      ref: 'DreamTeam'
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;

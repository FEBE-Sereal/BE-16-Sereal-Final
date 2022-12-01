const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      lowercase: [true, "please use lowercase email"],
      required: [true, "email is required"],
      match: [/^\S+@\S+\.\S+$/, `email is invalid `],
      // [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
      // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
      // unique: true,
      index: true,
      validate: {
        validator(email) {
          return this.model("User")
            .findOne({ email })
            .then((result) => !result);
        },

        message: (props) => "Email already taken",
        // message: props => `Email already taken!`
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    sekolah: String,
    jns_kelamin: {
      type: String,
      enum: ["pria", "wanita"],
    },
    tgl_lahir: {
      type: Date,
    },
    kelas: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Kelas",
      },
    ],
    challenge: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Challenge",
      },
    ],
    social_media: {
      insta: String,
      fb: String,
      other: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
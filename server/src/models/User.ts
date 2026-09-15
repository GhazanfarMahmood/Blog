import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Profile
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      default : "",
      trim : true,
    },

    aboutMe: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    profileImage: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["super-admin", "admin", "editor", "viewer"],
      default: "viewer",
      required: true,
    },

    // Password reset
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
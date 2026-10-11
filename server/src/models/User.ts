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

      isWriter : {
        type : Boolean,
        default : false,
      },

      designation: {
        type : String,
        default : "",
        trim : true,
      },

      location: {
        type : String,
        default : "",
        trim: true,
      },

      fbLink : {
        type : String,
        default : "",
      },

      twitterLink : {
        type : String,
        default : "",
      },

      instagramLink : {
        type : String,
        default : "",
      },

      linkedinLink : {
        type: String,
        default : "",
      },

      isFeaturedWriter : {
        type: Boolean,
        default : false,
      },

      slug : {
        type : String, 
        unique : true, 
        trim: true,
        sparse : true,
      }
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model("User", userSchema);
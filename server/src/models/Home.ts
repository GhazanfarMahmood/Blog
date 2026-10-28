import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    highlightText: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Home", homeSchema);
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName : {type: String, required: true, unique: true, trim : true},
    slug : {type: String, required: true, unique: true, trim : true},
    image : {type: String, required: true},
    icon : {type: String},
    description : {type: String, required: true},
    isPublished : {type: Boolean, default : true},
}, {timestamps: true});

export default mongoose.model("Category", categorySchema);
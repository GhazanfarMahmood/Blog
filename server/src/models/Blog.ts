import mongoose  from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {type : String, required : true},
    slug : {type: String, required: true},
    content: {type: String, required: true},
    thumbnail : {type: String, required: true},
    category : {type: String, required: true},
    tags : {type: String, required: true},
    author: {type: String, required: true},
    isPublished: {type: Boolean, default: false},
}, {timestamps: true});

export default mongoose.model("Blog", blogSchema);
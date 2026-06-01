import mongoose  from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {type: String, required : true},
    thumbnail : {type: String, required: true},
    category : {
        type : [
            {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
        ], 
        required: true,
        default : [],
    },
    reading : {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Writer", required: true},
    excerpt : {type: String, required: true},
    content: {type: String, required: true},
    slug : {type: String, required: true, trim: true},
    tags : {type: [String], required: true, default: []},
    isPublished: {type: Boolean, default: false},
}, {timestamps: true});

export default mongoose.model("Blog", blogSchema);
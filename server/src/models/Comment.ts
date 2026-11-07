import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog",
        required: true,
        index: true,
    },
    name : {
        type: String,
        required: true,
        trim : true,
        maxlength: 100,
    },
    email : {
        type: String, 
        required: true,
        trim : true,
        lowercase: true,
    },
    message : {
        type: String, 
        required: true,
        trim : true, 
        maxlength: 2000,
    },
    isApproved : {
        type: Boolean, 
        default: false
    },
}, {timestamps : true});

export default mongoose.model("Comment", commentSchema);
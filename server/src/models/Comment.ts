import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    message : {type : String, required : true},
    isApproved : {type : Boolean, default : false},
}, {timestamps : true});

export default mongoose.model("Comment", commentSchema);
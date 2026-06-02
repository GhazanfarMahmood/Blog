import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
    name : {type : String, required: true},
    designation : {type : String, required: true},
    slug : {type : String, required: true, unique : true, trim: true},
    excerpt : {type : String, required: true},
    location : {type: String, required : true},
    fbLink : {type : String, default : ""},
    twitterLink : {type : String, default : ""},
    instagramLink : {type : String, default : ""},
    LinkedinLink : {type : String, default : ""},
}, {timestamps: true});

export default mongoose.model("Writer", writerSchema);  
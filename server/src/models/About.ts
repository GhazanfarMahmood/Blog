import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    title : {type: String, required: true},
    images : {type : [String], required: true, default: []},
    description : {type : String, required: true},
    moreContent : [
        {
            icon : { type : String, required: true,},
            title : { type : String, required: true,},
            excerpt : { type : String, required: true,},
        }
    ]
})

export default mongoose.model("About", aboutSchema);
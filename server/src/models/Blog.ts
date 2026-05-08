import { Mongoose } from "mongoose";


const blogSchema = new Mongoose.Schema({
    title : {type : String, required : true},

}, {})
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true,
        maxlength: 254,
    },

    isSubscribed : {
        type: Boolean,
        default : true,
    },

    unsubscribedAt: {
        type : Date,
        default: null,
    }
}, {timestamps : true});

const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
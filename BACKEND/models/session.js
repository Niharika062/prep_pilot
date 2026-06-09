import mongoose from "mongoose";

const sessionSchema= new mongoose.Schema({

    role:{
        type:String,
        required:true
    },
    numberOfQuestions:{
        type: Number,
        required: true
    },
    report:{
        type:String,
        default:""
    },
    questions:[String],
    answers:[String]

}, {timestamps:true});

const Session= mongoose.model("Session", sessionSchema);


export default Session ;
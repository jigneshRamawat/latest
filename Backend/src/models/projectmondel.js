import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    dec:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
})

const projectmodel = mongoose.model("project", projectSchema);
export default projectmodel;
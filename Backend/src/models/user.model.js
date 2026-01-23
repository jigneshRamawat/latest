import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const usermodel = mongoose.model("userid", userSchema)

export default usermodel;
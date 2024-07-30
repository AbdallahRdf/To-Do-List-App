import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    resetPasswordToken: mongoose.SchemaTypes.String,
    resetPasswordExpires: mongoose.SchemaTypes.Date,
})

export default mongoose.model("User", userSchema);
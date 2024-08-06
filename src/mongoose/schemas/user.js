import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
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
    image: {
        data: Buffer, // Store the image data as a Buffer
        contentType: mongoose.SchemaTypes.String // Store the MIME type of the image (e.g., 'image/jpeg')
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    resetPasswordToken: mongoose.SchemaTypes.String,
    resetPasswordExpires: mongoose.SchemaTypes.Date,
})

export default mongoose.model("User", userSchema);
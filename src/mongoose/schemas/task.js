import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    owner: mongoose.SchemaTypes.ObjectId,
})

export default mongoose.model("Task", taskSchema);
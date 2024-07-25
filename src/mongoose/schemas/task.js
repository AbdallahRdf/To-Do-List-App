import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: mongoose.SchemaTypes.String,
    dueDate: mongoose.SchemaTypes.Date,
    status: mongoose.SchemaTypes.String,
    owner: mongoose.SchemaTypes.ObjectId,
})

export default mongoose.model("Task", taskSchema);
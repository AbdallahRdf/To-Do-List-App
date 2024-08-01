import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    status: {
        type: mongoose.SchemaTypes.String,
        enum: ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
        default: "Pending"
    },
    owner: mongoose.SchemaTypes.ObjectId,
})

export default mongoose.model("Task", taskSchema);
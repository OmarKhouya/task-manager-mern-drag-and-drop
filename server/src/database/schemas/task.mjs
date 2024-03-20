import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    priority: {
        type: mongoose.Schema.Types.String,
    },
    duration: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    dateCreation : mongoose.Schema.Types.String,
    doing: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    done: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
})

export const Task = mongoose.model("Task",taskSchema)

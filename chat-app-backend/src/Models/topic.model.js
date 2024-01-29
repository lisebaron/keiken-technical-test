import mongoose from "mongoose";

// Define the Topic schema
const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
},
{
    collection: "Topic"
});

// Create model from schema
const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
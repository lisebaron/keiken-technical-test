import mongoose from "mongoose";

// Define the Prompt schema
const messageSchema = new mongoose.Schema({
    role: {
        type: String, // user or assistant
        required: true
    },
    message_content: {
        type: String,
        required: true
    },
    topic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
},
{
    collection: "Message"
});

// Create model from schema
const Message = mongoose.model("Message", messageSchema);
export default Message;
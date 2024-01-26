import mongoose from "mongoose";

// Define the Prompt schema
const messageSchema = new mongoose.Schema({
    messageContent: {type: String},
    apiKey: {type: String},

},
{
    collection: "Discussion"
});

// Create model from the schema
const Message = mongoose.model("Message", messageSchema);
export default Message;
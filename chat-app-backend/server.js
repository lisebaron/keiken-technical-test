import express from 'express';
import OpenAI from "openai";
import cors from 'cors';
import Message from './src/Models/message.model.js';
import Topic from './src/Models/topic.model.js';
import { connectToDB } from './src/database.js';
import { isValidObjectId } from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json());
connectToDB();

/**
 * Create Message
 */
app.post("/create", async (req, res) => {
    const topicId = req.body.topicId;
    const newMessage = new Message({
        message_content: req.body.message_content,
        role: "user",
        topic_id: topicId
    });

    let messageList = [];
    if (isValidObjectId(topicId)) {
        await Message.find({topic_id: topicId})
        .then((messages) => {
            messageList = messages.map(message => ({
                role: message.role,
                content: message.message_content
            }));
        });
    }

    messageList.push({role: newMessage.role, content: newMessage.message_content});

    callOpenAI(req.body.apiKey, messageList).then(async (response) => {
        if (!isValidObjectId(topicId)) {
            const newTopic = createTopic(newMessage.message_content);
            newMessage.topic_id = newTopic._id;
        }

        const newAnswer = new Message({
            message_content: response.message.content,
            role: response.message.role,
            topic_id: newMessage.topic_id
        });

        //save in db
        try {
            await newMessage.save();
            await newAnswer.save();
            res.status(201).json({newAnswer: newAnswer});
        } catch (error) {
            res.status(400).end("Error when creating Messages");
        }
    }).catch((error) => {
        res.status(400).end("no api key");
    });
});

/**
 * Create Topic
 * @param messageContent
 */
function createTopic(messageContent) {
    const topic = new Topic({
        name: messageContent,
    });

    try {
        topic.save();
        return topic;
    } catch (error) {
        console.error("Error when creating Topic : ", error);
    }
}

/**
 * Request to OpenAI
 * @param apiKey 
 * @param messageList 
 * @returns 
 */
async function callOpenAI(apiKey, messageList) {
    const openai = new OpenAI({ apiKey: apiKey});
    const completion = await openai.chat.completions.create({
        messages: messageList,
        model: "gpt-3.5-turbo",
    });
    
    return completion.choices[0];
}

/**
 * Get Messages By Topic Id
 */
app.get("/getMessages/:id", async (req, res) => {
    const topicId = req.params.id;

    //get messages from db by topicId
    Message.find({topic_id: topicId})
        .then((messages) => {
            res.status(200).json({messages: messages});
        })
        .catch ((error) => {
            res.status(400).end("Error when getting Messages by topicId");
        })
});

/**
 * Get All Topics
 */
app.get("/getTopics", (req, res) => {
    Topic.find({})
        .then((topics) => {
            res.status(200).json({topics: topics});
        })
        .catch((error) => {
            res.status(400).end("Error when getting Topics");
        });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});
import express from 'express';
import OpenAI from "openai";
import cors from 'cors';
import Message from './src/Models/message.model.js'
import { connectToDB } from './src/database.js';

const app = express();
const openai = new OpenAI({ apiKey: ''});

app.use(cors());
app.use(express.json());

// app.get("/test", (req, res) => {
//     res.status(201).json({test:req.query});
//     // const completion = await openai.chat.completions.create({
//     //     messages: [{ role: "system", content: "What is a tomato?" }],
//     //     model: "gpt-3.5-turbo",
//     // });
//     // let response = completion.choices[0].message.content;
//     // res.json({ message: response });
// });

//create
app.post("/create", async (req, res) => {
    connectToDB();
    //save messagecontent in db
    const newMessage = new Message({
        messageContent: "test !",
        apiKey: "aaa"
    })

    try {
        await newMessage.save();
        res.status(201).json({newMessage : newMessage});
    } catch (error) {
        console.error("Oh no : ", error);
    }
    //send request to openAi
    //save openAi response in db for display
    //return response
});

//get
app.get("/getDiscussion", async (req, res) => {
    connectToDB();
    //get messages from db
   
    Message.find({})
        .then((messages) => {
            res.status(200).json({messages: messages});
        })
        .catch ((error) => {
            console.error("Oops ! : ", error);
        })
});

// app.get('/test', async (req, res) => {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "What is a tomato?" }],
//         model: "gpt-3.5-turbo",
//       });
//     let response = completion.choices[0].message.content;
//     res.json({ message: response });
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});
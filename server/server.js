import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


// async function run() {
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());
// }
// run();


app.get('/', async (req, res) => {
    res.status(200).send({
    message:"Hello from Codexpert 🙏",
    })
})

app.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    // const prompt = "Explain how AI works";


    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        // console.log(result.response.text());
        // const response = result.response;
        res.status(200).send({
            'bot':  result.response.text()
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${5000}`);
});








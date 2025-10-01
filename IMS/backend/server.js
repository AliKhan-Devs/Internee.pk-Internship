import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db.js"

import userRoutes from "./Routes/userRoutes.js"
import internshipsRoutes from "./Routes/internshipsRoutes.js"
import applicationRoutes from './Routes/applicationRoutes.js'
import tasksRoutes from './Routes/tasksRoutes.js';
import submissionRoutes from './Routes/submissionRoutes.js';
import feedbackRoutes from './Routes/feedbackRoutes.js';
import cors from 'cors'


dotenv.config()

const app = express()
app.use(express.json());
app.use(cors( {
    origin:'*'
}));

const port = process.env.PORT;

dbConnect();
app.get('/',(req,res)=>{
    res.send("Welcome to IMS Server")
})

app.use('/user',userRoutes);
app.use('/internships',internshipsRoutes);
app.use('/application',applicationRoutes);
app.use('/task',tasksRoutes);
app.use('/submission',submissionRoutes);
app.use('/feedback',feedbackRoutes);

app.listen(port,()=>{
    console.log(`app is listning on http://localhost:${port}`);
})
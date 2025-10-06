import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { connectDB } from './configurations/db.js';
import authRoutes from './routes/authRoutes.js'
import buttonRoutes from './routes/buttonsRoutes.js'
import cardRoutes from './routes/cardsRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'
import sectionRoutes from './routes/sectionRoutes.js'
import themeRoutes from './routes/themeRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import uploadRoutes from './routes/imageUpload.js'
import userRoutes from './routes/userRoutes.js'

import cookieParser from 'cookie-parser'
const app = express();
configDotenv();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['https://portabuild.vercel.app', 'http://localhost:5173'];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));



const port = process.env.PORT;
connectDB();

app.get('/',(req,res)=>{
   
    res.send('Hello from PortaBuild Server')
})

app.use('/user',authRoutes);
app.use('/button',buttonRoutes);
app.use('/card',cardRoutes);
app.use('/contact',contactRoutes);
app.use('/portfolio',portfolioRoutes);
app.use('/section',sectionRoutes);
app.use('/theme',themeRoutes);
app.use('/upload',uploadRoutes);
app.use('/analytics',analyticsRoutes);
app.use('/users',userRoutes);



app.listen(port,()=>{
    console.log(`PortaBuild Server is listning on http://localhost:${port}`);
})
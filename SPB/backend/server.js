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
import cookieParser from 'cookie-parser'
const app = express();
configDotenv();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
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

app.listen(port,()=>{
    console.log(`PortaBuild Server is listning on http://localhost:${port}`);
})




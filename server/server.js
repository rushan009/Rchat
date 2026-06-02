
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import express from 'express'
import {createServer} from 'http'



import connectionDb from "./src/config/db.js";
import authRouter from './src/routes/auth.routes.js'
import convoRouter from './src/routes/conversation.routes.js'
import messageRouter from './src/routes/message.routes.js'
import userRouter from './src/routes/user.routes.js'
import initSocket from './src/config/socket.js';


dotenv.config();

const app = express();

const httpServer = createServer(app)
const io = initSocket(httpServer)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter )
app.use('/api/conversations', convoRouter)
app.use('/api/conversations/:id', messageRouter)
app.use('/api/users', userRouter)

connectionDb();

httpServer.listen(process.env.PORT || 8000, ()=>{
    console.log(`App is listening on PORT ${process.env.PORT || 8000}`);
    
})

export {io}
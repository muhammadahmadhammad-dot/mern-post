import express from "express"
import dotenv from "dotenv"
import connection from "./config/db.js";
import userRouter from "./routes/userRoute.js"
import postRouter from "./routes/postRoute.js"
import cors from 'cors';
import commentRouter from "./routes/commentRoutes.js";

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)

connection(process.env.DBURL)

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log('Server is start',PORT)
})
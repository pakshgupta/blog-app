import express from 'express'
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(cookieParser());

import userRoute from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comment.routes.js'

app.use('/api/v1/users',userRoute);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/comments",commentRouter);
export {app}
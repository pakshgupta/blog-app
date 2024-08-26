import  connectDB  from "./database/index.js";
import { app } from "./app.js";
import dotenv from 'dotenv'
dotenv.config()
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 4000, () =>
    console.log("App is running at port number", process.env.PORT)
  );
}).catch((error)=>{
  console.log("MongoDB connection failed!!",error);
})


import mongoose  from "mongoose";

const connectDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/bloggingapplication`)
        console.log(`\nMONGODB connected !! DB HOST: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.error("Mongo DB connection Failed:",error);
        process.exit(1)
    }
}
export default connectDB
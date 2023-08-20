import mongoose from 'mongoose'


let isConnected = false


export const connectToDB = async () =>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("mongo is connected");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "shared_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('Mongo connected')
    } catch (error) {
        console.log(error);
    }
}
import {connectToDB} from '@utils/database'
import Prompt from '@models/prompts'


export const GET = async (req , {params}) =>{
    
    try {
        
        await connectToDB();
       const prompts = await Prompt.find({
         creator: params.id
       }).populate('creator');
    //    console.log(prompts.json());
        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error);
        return new Response("Faild to find a new prompt", {status:500})
    }
}
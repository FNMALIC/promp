import {connectToDB} from '@utils/database'
import Prompt from '@models/prompts'


export const GET = async (req ,{params}) =>{
    
    try {
        await connectToDB();
       const prompts = await Prompt.findById(params.id).populate('creator');
    //    console.log(prompts.json());
        if (!prompts) {
            return new Response("Prompt doesnot exist")
        }
    return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error);
        return new Response("Faild to find a new prompt", {status:500})
    }
}

export const PATCH = async (req ,{params}) =>{

    const {prompt,tag} = await req.json()
    try {
        await connectToDB();
       const existingPrompt = await Prompt.findById(params.id).populate('creator');
    //    console.log(prompts.json());
        if (!existingPrompt) {
            return new Response("Prompt doesnot exist")
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        console.log(error);
        return new Response("Faild to find a new prompt", {status:500})
    }
}

export const DELETE = async (req ,{params}) =>{
    try {
        await connectToDB();
    
        await Prompt.findByIdAndRemove(params.id)
        
        return new Response("Prompt delete successfully",{status: 200})
    
    } catch (error) {
        console.log(error);
        return new Response("Faild to find a new prompt", {status:500})
    }
}
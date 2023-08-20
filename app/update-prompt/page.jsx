
'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter,useSearchParams } from "next/navigation"

import Form from "@components/Form"

const EditPrompt = () =>{
    const router = useRouter();
 const [submitting, setsubmitting] = useState(false)
 const [post, setpost] = useState({
    prompt: '', tag: ''
 })
 const searchParams = useSearchParams();
 const promptId = searchParams.get('id');


 useEffect(() =>{
    console.log("2133333333333655555555555555555555555555555555");
    console.log(promptId);
    console.log("2133333333333655555555555555555555555555555555");

    const getPromptsDetails = async () =>{
        const response = await fetch(`/api/prompt/${promptId}`)

        const data = await response.json()

        setpost({
            prompt: data.prompt,
            tag: data.tag
        })
    }
    if (promptId) getPromptsDetails()
 },[promptId])


 const EditPromptId = async (e) =>{
    e.preventDefault();
    setsubmitting(true)

    if(!promptId)return alert("prompt id doesnot exist")
    try {
        const resp = await fetch(`/api/prompt/${promptId}`,{
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
        })

        if (resp.ok) {
            router.push('/')
        }
    } catch (error) {
        console.log(error);
    }finally{
        setsubmitting(false)
    }
 }


    return (
   <Form
    type="Edit"
    post={post}
    setpost={setpost}
    submitting={submitting}
    handleSubmit={EditPromptId}
   />
)

}

export default EditPrompt
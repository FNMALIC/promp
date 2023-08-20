// import React from "react"
'use client'

import { useState , useEffect} from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile= () =>{
    const router  = useRouter()
    const [userPosts, setuserPosts] = useState([])
    const { data: session } = useSession();


    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setuserPosts(data);
        console.log(userPosts);

    };
    
      useEffect(() => {
        if (session?.user.id) {
            fetchPosts();            
        }
      }, []);


    const handleEdit = (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post)=>{
        
        const  hasConfirmed = confirm("Are you sur you want this?")
        
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: "DELETE"
                });
                
            const filteredPosts = userPosts.filter((item) => item._id !== post._id);

                console.log(filteredPosts);
                setuserPosts(filteredPosts)
            } catch (error) {
                console.log(error);
            }
        }
      
    }
    return  (
            <Profile
                name="My"
                desc="Welcome to your Profile"
                data={userPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
    )

}


export default MyProfile
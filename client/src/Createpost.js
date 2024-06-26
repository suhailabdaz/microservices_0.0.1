import React, { useState } from 'react'
import axios from "axios"

function Createpost() {
   
    const [post,setPost] = useState()

    const handle = async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:4000/posts",{
            post
        })

        setPost("")

    }
    return (
    <div>
    <h1>Create a post</h1>
        <form onSubmit={handle}>
            <label>
                Post:
                <input type='text' onChange={e=>setPost(e.target.value)}/>
            </label>
            <button type='submit'>Create</button>
        </form>
    </div>
    )
}

export default Createpost
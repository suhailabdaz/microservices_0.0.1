import React, { useState } from 'react'
import axios from "axios"

function Commentcreate({postId}) {
    const [comment,setcomment]=useState()

    const onsubmit = async (e)=>{
        e.preventDefault()
        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{comment})
        setcomment("")
    }

    return (
    <div>
        <form onSubmit={onsubmit}>
            <label>
                New Comment
            </label>
            <input type='text' value={comment} onChange={e=>setcomment(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
    )
}

export default Commentcreate
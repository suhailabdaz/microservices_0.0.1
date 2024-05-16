import React, { useEffect, useState } from 'react'
import axios from "axios"
import Commentcreate from './Commentcreate'
import Commentlist from './Commentlist'

function Postlist() {
    
    const [postlist,setPostlist]=useState({})
    const fetchPosts =async ()=>{
         const res = await axios.get("http://localhost:4002/posts")
         setPostlist(res.data)
    }

    useEffect(()=>{
        fetchPosts()
    },[])


    
        const renderedpost = Object.values(postlist).map(post=>{
            return (
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-6 py-4'key={post.id}>
                    <div className='class="font-bold text-xl mb-2"'>
                        <h3>{post.post}</h3>
                        <Commentlist comments ={post.comments}/>
                        <Commentcreate postId={post.id}/>
                    </div>
                </div>
            )
        })
        
    

  return (
    <div>
    {renderedpost}
    </div>
  )
}

export default Postlist
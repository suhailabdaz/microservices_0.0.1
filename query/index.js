const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const axios = require("axios")

const app =express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type,data)=>{
    if(type=="postCreated"){
        const {id,post} = data
        posts[id] = {
            id,post,comments:[]
        }
    }
    if(type == "commentCreated"){
        const {id,comment,postId,status} = data
        const post = posts[postId]
        post.comments.push({id,comment,status})
    }

    if(type=="commentUpdated"){
        const {id,comment,postId,status} = data
        const post = posts[postId]
        const thecomment = post.comments.find(comment=>{
            return comment.id ==id
        })
        thecomment.status = status
        thecomment.comment = comment

    }
}

app.get("/posts",(req,res)=>{
    res.send(posts)

})

app.post("/events",(req,res)=>{
        
    const {type,data} = req.body
    handleEvent(type,data)
    res.send({})
})

app.listen(4002,async()=>{
    console.log("listening to 4002");
    
    const res = await axios.get("http://localhost:4005/events")
    for(let event of res.data){
        console.log("processig data :",event.type);
        handleEvent(event.type,event.data)
    }
})
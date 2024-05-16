const express = require("express")
const bodyParser = require("body-parser")
const {randomBytes}=  require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsById = {}

app.get("/posts/:id/comments",(req,res)=>{
        res.send(commentsById[req.params.id] || [])
})

app.post("/posts/:id/comments",async (req,res)=>{
        const commentId = randomBytes(4).toString("hex")
        const {comment} = req.body
        const comments = commentsById[req.params.id] || []
        comments.push({id : commentId , content : comment,status:"pending"})
        commentsById[req.params.id]= comments
        
        await axios.post("http://localhost:4005/events",{
                type:"commentCreated",
                data:{
                        id:commentId,
                        comment,
                        postId : req.params.id,
                        status :"pending"
                }
        })

        res.status(201).send(comments)
})

app.post("/events",async (req,res)=>{
        try{
        const {type,data} = req.body
        if(type=="commentModerated"){
                const {id,postId,status,comment}= data
                const comments = commentsById[postId]

                const thecomment  = comments.find(comment=>{
                        return comment.id == id
                })
                thecomment.status = status
                await axios.post("http://localhost:4005/events",{
                        type:"commentUpdated",
                        data :{
                                id,postId,comment,status
                        }
                })

        }
        res.send({})
}catch(err){
        console.log("erererererer",err);
}
})

app.listen(4001,()=>{
    console.log("running in 4001");
})
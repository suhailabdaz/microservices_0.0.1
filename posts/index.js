const express = require("express")
const {randomBytes} = require("crypto")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const axios = require("axios")

app.use(bodyParser.json())
app.use(cors())


const posts ={}

app.get("/posts",(req,res)=>{
    console.log(posts);
        res.send(posts)
})

app.post("/posts",async (req,res)=>{


    const id = randomBytes(4).toString("hex")

    const {post} = req.body

    posts[id]= {
        id,post
    };
    await axios.post("http://localhost:4005/events",{
        type : "postCreated",
        data:{
            id,post
        }
    })



    res.status(201).send(posts[id])


})

app.post("/events",(req,res)=>{
    console.log(req.body);
    res.send({})
})

app.listen(4000,()=>{
    console.log("listening to 4000");
})
const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const handlereq= async(type,data)=>{
    if(type=="commentCreated"){
        const status = data.comment.includes("orange") ? "rejected" : "approved";
        await axios.post("http://localhost:4005/events",{
            type : "commentModerated",
            data:{
                id:data.id,
                postId : data.postId,
                comment : data.comment,
                status
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}

app.post("/events",async(req,res)=>{
    console.log(req.body);
    const {type,data} = req.body
    handlereq(type,data)
    res.send({})
})

app.listen(4003,async()=>{
    console.log("listening to 4003");
    const res = await axios.get("http://localhost:4005/events")
    for(let event of res.data){
        console.log("processig data :",event.type);
        handlereq(event.type,event.data)
    }
})
import React from 'react'

function Commentlist({comments}) {
    const renderedcomments = comments.map(comment=>{
      let content
      if(comment.status =="pending"){
           content = "comment are being moderated"
      }
      if(comment.status == "approved"){
        content = comment.comment
      }
      if(comment.status =="rejected"){
        content = "rejected"
      }
        return(
                <li key={comment.id}>{content}</li>
           
        )
    })

  return (
    <ul>{renderedcomments}</ul>
   
  )
}

export default Commentlist
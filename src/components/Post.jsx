import React from 'react'
import "../styles/post.css"
import Avatar from "@material-ui/core/Avatar";


export default function Post({username, image, caption}){
    
        return (
            <div className="post__container">
                <div className="post__header">
                    <Avatar className="post__avatar" alt="" src="" />
                <h3>{username}</h3>
                </div>
               <img className="post__image" alt="img" src={image}></img>
            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
            </div>
        )
    
}

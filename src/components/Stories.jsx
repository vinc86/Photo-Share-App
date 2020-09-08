import React from 'react'
import Post from './Post'

export default function Stories({post}) {
    const posts = post.map(({post, id})=>(
        <Post key={id} image={post.image} username={post.username} caption={post.caption} />
       ))
    return (
        <div>
            {posts}
        </div>
    )
}

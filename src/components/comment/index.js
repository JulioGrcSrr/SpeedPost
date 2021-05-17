import React from 'react'

export default function Comment({username , content}){
    return (
        <div className="comment">
            <p>
                <span style={{marginRight: '1vh'}}><b>{username}</b></span> 
                {content}
            </p>
        </div>
    )
}
 
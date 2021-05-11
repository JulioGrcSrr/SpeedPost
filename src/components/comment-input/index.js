import './style.css';
import React, { useState , useContext } from 'react'
import { UserContext } from '../../contexts/user'
import { db } from '../../firebase';

export default function CommentInput({comments, id}) {
    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState("");
    const [commentArray, setCommentArray] = useState(comments ? comments : []);

    const addComment = () =>{
        //add comment to the post document
        if(comment != ""){

            commentArray.push({
                comment : comment,
                username: user.email.replace("@gmail.com","").replace("@iescampanillas.com" , ""),
            });

            db.collection("posts")
            .doc(id)
            .update({
                comments: commentArray,
            }).then(function(){
                setComment("");
                console.log('comment added');
            }).catch(function (error) {
                console.log(`Error ${error}`);
            });
        }
    }
    return (
        <div className="commentInput">
            <textarea
                className="commentInput__textarea"
                rows="1"
                placeholder='Comment something...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ></textarea>
            <button onClick={addComment} className="commentInput__btn">Comment</button>
        </div>
    )
}

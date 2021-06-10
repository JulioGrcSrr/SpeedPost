import React, { useContext , useState , useEffect} from 'react';
import { Comment, Like } from '../../components';
import { CommentInput } from '../../components';
import { UserContext } from '../../contexts/user'
import './style.css';
import { db, storage } from '../../firebase';
import useSound from "use-sound";
import deleteSound from '../../resources/sounds/deleteSound.mp3';


export default function Post({profileUrl , username , id , photoUrl , content , comments, userId, likes , Nlike , date}) {
    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext).user;

    const [playDelete] = useSound(deleteSound)

    const handleDelete = () =>{
        if(userId == user.uid){
            if(photoUrl){
                let pictureRef = storage.refFromURL(photoUrl);
                pictureRef.delete()
                .then(() => {
                    console.log('the image was remove from storage')
                });
            }
                db.collection("posts").doc(id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                
            playDelete();    
        }
    }

    return (
        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_userImg" src={profileUrl} />
                    <p style={{marginLeft: '1.5vh'}}>{username}</p>
                </div>
                {userId === user.uid && <button className="post_deleteBtn" onClick={handleDelete}>Delete</button>}
                
            </div>
            <div className="post_center">
                <img className="post_postPhoto" src={photoUrl}/>
            </div>
            <div className="post_footer">
                <p>
                    <span style={{marginRight: '1vh'}}><b>{username}</b></span> 
                    {content}
                </p>
            </div>
            <div className="post_date">
                    <p>Posted at {date}</p>
            </div>
            {comments ? comments.map((comments) => <Comment username={comments.username} content={comments.comment}/>) : <></>}
            { user ? <CommentInput comments={comments} id={id} /> : <p></p>}
            
        </div>
    )
}

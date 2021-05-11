import React, { useContext , useState , useEffect} from 'react';
import { Comment, Like } from '../../components';
import { CommentInput } from '../../components';
import { UserContext } from '../../contexts/user'
import './style.css';
import { db, storage } from '../../firebase';
export default function Post({profileUrl , username , id , photoUrl , content , comments, userId, likes , Nlike}) {
    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext).user;
    //delete the post 
    const handleDelete = () =>{
        if(userId == user.uid){
                let pictureRef = storage.refFromURL(photoUrl);
                pictureRef.delete()
                .then(() => {
                    console.log('the image was remove from storage')
                });
                db.collection("posts").doc(id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                
                
        }
    }

    return (
        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_userImg" src={profileUrl} />
                    <p style={{marginLeft: '1.5vh'}}>{username}</p>
                </div>
                {/* delete button only appear if the userId is the same */}
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
                <Like Nlike={Nlike} likes={likes} postId={id} UId={userId}/>
            </div>
            
            {comments ? comments.map((comments) => <Comment username={comments.username} content={comments.comment}/>) : <></>}
            { user ? <CommentInput comments={comments} id={id} /> : <p></p>}
            
        </div>
    )
}

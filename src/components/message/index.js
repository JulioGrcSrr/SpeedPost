import React , { useContext } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css';
import { db, storage } from '../../firebase';
export default function Message({username , content , photoUrl , userId , id , roomId}){
    const [user, setUser] = useContext(UserContext).user;

    const handleDelete = () =>{
        if(userId == user.uid){
            if(photoUrl){
                let pictureRef = storage.refFromURL(photoUrl);
                pictureRef.delete()
                .then(() => {
                    console.log('the image was remove from storage')
                });
            }
                db.collection("rooms").doc(roomId).collection('messages').doc(id).delete().then(() => {
                    console.log("Document successfully deleted!");
                    console.log();
                    console.log(id)
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                
                
        }
    }

    return (
        <div className="message">
            <div>
                <p>
                    <span style={{marginRight: '1vh'}}><b>{username}</b></span> 
                    {userId === user.uid && <button className="post_deleteBtn" onClick={handleDelete}>Delete</button>}
                </p>
            </div>
            
            <div className="message_center">
                <div className="message_photoContainer">
                    <img className="message_messagePhoto" src={photoUrl}/>
                </div>
                <div> {content}</div>
               
            </div>
        </div>
    )
}
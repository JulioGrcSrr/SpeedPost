import React, { useContext , useState , useEffect} from 'react';
import { UserContext } from '../../contexts/user'
import './style.css';
import { db, storage } from '../../firebase';
import { CreateMessage, Message } from '../../components';
import useSound from "use-sound";
import deleteSound from '../../resources/sounds/deleteSound.mp3';
export default function Room({profileUrl , username , id , photoUrl , title, userId , Roomtimestamp}) {
    
    // eslint-disable-next-line
    const [user, setUser] = useContext(UserContext).user;
    const [messages, setMessages] = useState([]);
    const [playDelete] = useSound(deleteSound);
    useEffect(() => {
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp' , 'asc').onSnapshot((snapshot) => 
        {
         setMessages(snapshot.docs.map((doc) =>({id: doc.id, message: doc.data()})));
        })
     }, [])

     console.log(`room id ${id}`)
     var roomId = id;
    const handleDelete = () =>{
        if(userId == user.uid){
            if(photoUrl){
                let pictureRef = storage.refFromURL(photoUrl);
                pictureRef.delete()
                .then(() => {
                    console.log('the image was remove from storage')
                });
            }

               
                db.collection("rooms").doc(id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                playDelete();    
                
        }
    }

    return (
        <div className="room">
            <div className="room_header">
                <div className="room_headerLeft">
                <p style={{marginBottom: '2vh' , marginLeft: '1.5vh' , fontSize: '2vh'}}><b>{title}</b></p>
                </div>
                {userId === user.uid && <button className="room_deleteBtn" onClick={handleDelete}>Delete</button>}
                
            </div>
            <div className="room_date">
                    <p>Created at {Roomtimestamp}</p>
            </div>
            <div className="room_body">
            {
                messages.map(({id , message})=>{
                    return(
                        <Message 
                            id={id}
                            roomId={roomId}
                            content={message.content}
                            username={message.username}
                            photoUrl={message.photoUrl}
                            userId={message.userId}
                        />
                    )
                })
            }
            

            </div>
            {user ?  <CreateMessage id={id}/> : <p></p>}
        </div>
    )
}
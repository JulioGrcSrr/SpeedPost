import React, { useContext , useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';
import uploadSound from '../../resources/sounds/uploadSound.mp3';
import useSound from "use-sound";
import firebase from 'firebase';

export default function CreateRoom() {
    var ts = new Date();
    const [user, setUser] = useContext(UserContext).user;

    const audioEl = document.getElementsByClassName("audio-element")[0]

    const [caption, setCaption] = useState("");

    const [progress, setProgress] = useState(0);

    const [playUpload] = useSound(uploadSound);

    const handleUpload = () => {
        var usernameFilter = user.email.split('@' , 1);
        if(caption != ""){
            
            db.collection("rooms").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                date: ts.toDateString(),
                title : caption, 
                username: usernameFilter[0],
                profileUrl: user.photoURL,
                userId : user.uid,
            })
            playUpload();
            setCaption("");
            setProgress(0);
        }
        
    }

    return (
        <div className="createRoom">

        {user ? (
        <div className="createRoom__loggedIn">
            <p>Create Discusion Room</p>
            <div className="createRoom__loggedInCenter">
                <textarea
                className="createRoom__textarea" rows="3" value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="About what you want talk?"
                >

                </textarea>
            </div>
            <div className="createRoom__loggedInBottom">
            <div className="createRoom_createBtnBox">
                <p></p>
                <button className="createRoom_uploadBtn" onClick={handleUpload} style={{color : caption ? "#000" : "lightgray"}}>{`Let's Talk ${progress != 0 ? progress : ""}`} </button>
            </div>
            </div>
        </div>
        ): 
        (<p> </p>)}

        </div>
    )
}
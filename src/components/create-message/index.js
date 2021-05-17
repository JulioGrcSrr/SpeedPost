import React, { useContext , useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';
import firebase from 'firebase';

export default function CreateMessage({id}) {

    const [user, setUser] = useContext(UserContext).user;

    const [caption, setCaption] = useState("");

    const [progress, setProgress] = useState(0);

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview");

                imagePreview.src = selectedImageSrc;
                imagePreview.style.display = "block";
              
        }
    }

    const handleUpload = () => {
        if(image) {
            var imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
            .put(image);

            uploadTask.on("state_changed" , (snapshot) => {
                
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);

                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, () => {
                storage.ref("images").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl) => {
                    db.collection('rooms').doc(id).collection('messages').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        content : caption, 
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com","").replace("@iescampanillas.com" , ""),
                        profileUrl: user.photoURL,
                        userId : user.uid,
                    })
                })
                setImage();
                setCaption("");
                setProgress(0);
                document.getElementById("image-preview").style.display = "none"
               
            });
        }else{
            db.collection('rooms').doc(id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                content : caption, 
                username: user.email.replace("@gmail.com","").replace("@iescampanillas.com" , ""),
                profileUrl: user.photoURL,
                userId : user.uid,
            })
            setCaption("");
        }
    }

    return (
        <div className="createMessage">

        {user ? (
        <div className="createMessage__loggedIn">
            <div className="createMessage__loggedInCenter">
                <textarea
                className="createMessage__textarea" rows="1" value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="what's happening?"
                >

                </textarea>
            </div>
            <div className="createMessage__imagePreview">
                <img id="image-preview" alt="" />
            </div>
            <div className="createMessage__loggedInBottom">
            <div className="createMessage__imageUpload">
                <label htmlFor="fileInput">
                    <AddPhotoAlternateIcon style={{cursor:"pointer" ,  fontSize:'2.5vh'}}/>
                </label>
               
                <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>
            </div>
            <div>
                <button className="createMessage_uploadBtn" onClick={handleUpload} style={{color : caption ? "#000" : "lightgray"}}>{`Upload ${progress != 0 ? progress : ""}`} </button>
            </div>
            </div>
        </div>
        ): 
        (<p> </p>)}

        </div>
    )
}
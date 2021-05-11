import React, { useContext , useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';
import firebase from 'firebase';

export default function CreatePost() {

    const [user, setUser] = useContext(UserContext).user;

    const [caption, setCaption] = useState("");

    const [progress, setProgress] = useState(0);

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        //Change the image of image preview
        if(e.target.files[0]){
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview");

                imagePreview.src = selectedImageSrc;
                imagePreview.style.display = "block";
              
        }
    }

    const handleUpload = () => {
        //Upload the post and save it in firestore
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
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        content : caption, 
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com","").replace("@iescampanillas.com" , ""),
                        profileUrl: user.photoURL,
                        userId : user.uid,
                    })
                })
                //set all the states to originals states
                setImage();
                setCaption("");
                setProgress(0);
                document.getElementById("image-preview").style.display = "none"
               
            });
        }
    }

    return (
        <div className="createPost">

        {user ? (
        <div className="createPost__loggedIn">
            <p>Create Post</p>
            <div className="createPost__loggedInCenter">
                <textarea
                className="createPost__textarea" rows="3" value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="what's happening?"
                >

                </textarea>
            </div>
            <div className="createPost__imagePreview">
                <img id="image-preview" alt="" />
            </div>
            <div className="createPost__loggedInBottom">
            <div className="createPost__imageUpload">
                <label htmlFor="fileInput">
                    <AddPhotoAlternateIcon style={{cursor:"pointer" ,  fontSize:'2.5vh'}}/>
                </label>
               
                <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>
            </div>
            <div>
                <button className="createPost_uploadBtn" onClick={handleUpload} style={{color : caption ? "#000" : "lightgray"}}>{`Upload ${progress != 0 ? progress : ""}`} </button>
            </div>
            </div>
        </div>
        ): 
        (<p> </p>)}

        </div>
    )
}

import React, { useContext , useState, useRef} from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import BrushIcon from '@material-ui/icons/Brush';
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';
import firebase from 'firebase';
import uploadSound from '../../resources/sounds/uploadSound.mp3';
import useSound from "use-sound";
import CanvasDraw from "react-canvas-draw";


export default function CreatePost() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    
    var ts = new Date();

    const myCanvas = useRef(null);

    const [user, setUser] = useContext(UserContext).user;

    const [paint, setPaint] = useState(false);

    const [caption, setCaption] = useState("");

    const [progress, setProgress] = useState(0);

    const [image, setImage] = useState(null);

    const [playUpload] = useSound(uploadSound);

    const [buttonCaption , setButtonCaption] = useState('Upload');

    const handleCheckData = () =>{
        
        
    }

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview");
 
                imagePreview.src = selectedImageSrc;
                imagePreview.style.display = "block";
              
        }
    }

    const paintChange = () => {
        if(paint){
            setPaint(false)
            setButtonCaption('Upload')
        }else{
            setPaint(true)
            setButtonCaption('Download')
        }
    }
    const handleUpload = () => {

        var usernameFilter = user.email.split('@' , 1);

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
                        date: ts.toDateString(),
                        content : caption, 
                        photoUrl: imageUrl,
                        username: usernameFilter[0],
                        profileUrl: user.photoURL,
                        userId : user.uid,
                    })
                })
                playUpload();
                setImage();
                setCaption("");
                setProgress(0);
                document.getElementById("image-preview").style.display = "none"
               
            });
        }else if(caption != ""){
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                date: ts.toDateString(),
                content : caption, 
                username: usernameFilter[0],
                profileUrl: user.photoURL,
                userId : user.uid,
            })

            setCaption("");
            playUpload();

        }else if(paint){
            const data = myCanvas.current.getSaveData();
            console.log(data);
            const imageN = myCanvas.current.canvasContainer.childNodes[1].toDataURL("image/jpeg" , 1.0);
            
            var imageName = makeid(10);
            const link = document.createElement("a");
            link.href = imageN;
            link.download = `${imageName}.png`;
            link.click();   
            
        }
    }

    return (
        <div className="createPost">
        {user ? (
             
        <div className="createPost__loggedIn">
            <p>Create Post</p>
            <div className="createPost__loggedInCenter">
               {paint ? 
                    <div>
                        <div> 
                            <input id="colorSelector" type="color"/>
                            <input type='range' min='0' max='1' value='0.5' step='0.1' id='mislider'/>
                        </div>
                            <CanvasDraw 
                                id="canvas"
                               ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                                hideInterface 
                                hideGrid 
                                canvasWidth={'48vw'}
                                canvasHeight={'30vh'}
                                brushRadius={'1'}
                                ref={myCanvas}
                            />
                    </div> 
               
                    : 

                <textarea
                className="createPost__textarea" rows="3" value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="what's happening?"
                >

                </textarea>
               } 
            </div>
            <div className="createPost__imagePreview">
                <img id="image-preview" alt="" />
            </div>
            <div className="createPost__loggedInBottom">
            <div className="createPost__imageUpload">
                <label htmlFor="fileInput">
                    <AddPhotoAlternateIcon style={{cursor:"pointer" ,  fontSize:'2.5vh'}}/>
                </label>

                <label htmlFor="paintIcon">
                    <BrushIcon style={{cursor:"pointer" ,  fontSize:'2.5vh' , paddingLeft:'2vh'}}/>
                </label>
               
                <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>
                <button id="paintIcon" className="paintButton" onClick={paintChange}></button>
            </div>
            <div>
                <button className="createPost_uploadBtn" onClick={handleUpload} style={{color : caption || image || paint ? "#000" : "lightgray"}}>{`${buttonCaption} ${progress != 0 ? progress : ""}`} </button>
            </div>
            </div>
        </div>
        ): 
        (<p> </p>)}
        <audio className="audio-element">
             <source src="src\containers\create-post\uploadSound.mp3"></source>
        </audio>
        </div>
    )
}

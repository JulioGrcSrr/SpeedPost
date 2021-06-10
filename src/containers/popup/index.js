import React, { useContext , useState } from 'react'
import SiginButton from '../../components/signinbutton'
import { UserContext } from '../../contexts/user'
import './style.css'
import videoBackground from '../../resources/videos/videoBackground.mp4';
export default function PopUp() {

    const [user, setUser] = useContext(UserContext).user

    return (
        <div className="popupsup">
              <video
                autoPlay
                loop
                muted
                style={{
                position: "absolute",
                width: "100%",
                left: "50%",
                top: "50%",
                height: "100%",
                objectFit: "cover",
                transform: "translate(-50%, -50%)",
                zIndex: "-1" 
                }}
      >  
        <source src={videoBackground} type="video/mp4"/>
      </video>
            <div className="popup">
                <p className="text-box">Sign In with Google to Post & Comment</p>
               <div className="SiginButton">
                    <SiginButton style={{cursor:"pointer"}} />   
                </div> 
            </div>
        </div>
    )
}
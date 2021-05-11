import React, { useContext , useState } from 'react'
import SiginButton from '../../components/signinbutton'
import { UserContext } from '../../contexts/user'
import './style.css'
export default function PopUp() {

    const [user, setUser] = useContext(UserContext).user

    return (
        <div className="popupsup">
            <div className="popup">
                <p className="text-box">Sign In with Google to Post & Comment</p>
               <div className="SiginButton">
                    <SiginButton />   
                </div> 
            </div>
        </div>
    )
}
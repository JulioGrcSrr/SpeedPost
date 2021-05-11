import React, { useContext , useState } from 'react'
import SiginButton from '../../components/signinbutton'
import { UserContext } from '../../contexts/user'
import logo from './logoSpeedPost.svg'

import './style.css'
export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user

    return (
        <div className="navbar">
            <p>SpeedPost</p>
               <img src={logo} className="App-logo" alt='logo'/> 
               
                    {user ? <img className='imgProfile' src={user.photoURL}/> : <p></p>}
        </div>
    );
}

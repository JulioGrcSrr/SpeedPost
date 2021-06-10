import React, { useContext , useState } from 'react'
import LogoutButton from '../../components/logoutbutton';
import { UserContext } from '../../contexts/user'
import logo from './logoSpeedPost.svg'

import './style.css'
export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user

    return (
        <div className="navbar">
               <img src={logo} className="App-logo" alt='logo'/> 
               <p style={{paddingLeft: '4vh' , fontSize: '3vh'}}>SpeedPost</p>
               <div className="navbarOptions">
                   <p></p>
                    {user ? <LogoutButton  style={{cursor:"pointer" ,  fontSize:'2.5vh'}}/>  : <p></p>}
                    {user ? <img className='imgProfile' src={user.photoURL}/> : <p></p>}
               </div>
                   
        </div>
    );
}

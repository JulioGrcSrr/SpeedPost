import React, { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import { logout } from '../../services/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signInWithGoogle } from '../../services/auth';
import './style.css';

export default function LogoutButton() {
    const [user, setUser] = useContext(UserContext).user;
    const logoutClick = async () => {
        console.log('hola')
        let userLogout =  await logout();
        setUser(userLogout);

        document.location.reload();

        // let userBySingIn = await signInWithGoogle()

        // if(userBySingIn) setUser(userBySingIn);
    }

    return (
        <div className="" onClick={logoutClick}>
            <ExitToAppIcon className="logout_icon"   style={{cursor:"pointer" ,  fontSize:'3.5vh'}}/>
        </div>
    )
}
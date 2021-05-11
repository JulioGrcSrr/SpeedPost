import React, { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import { signInWithGoogle } from '../../services/auth';
import "./style.css";

export default function SiginButton() {
    const [user, setUser] = useContext(UserContext).user;
    //get the user info from google provider and keep that at the userContext
    const signInClick = async () => {
        let userBySingIn = await signInWithGoogle()

        if(userBySingIn) setUser(userBySingIn);
        console.log(userBySingIn);
    };

    return (
        <div className="signInButton" onClick={signInClick}>
            <p>Sign In With Google</p>
        </div>
    )
}

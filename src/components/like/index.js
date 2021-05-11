import React, { useState , useContext } from 'react'
import { UserContext } from '../../contexts/user'
import { db } from '../../firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
export default function Like({likes , postId , Nlike}) {
    const [user, setUser] = useContext(UserContext).user;
    const [like, setLike] = useState(false);
    const [likeArray, setLikeArray] = useState(likes ? likes : []);
    
    const addLike = () =>{
        
    }
    //this component is a only a test file this mean that like function maybe not be implement in the final version
    return (
        <div className="like">
                <label htmlFor="likeInput">
                     <FavoriteIcon style={{cursor:"pointer" , marginRight: '1vh' ,  fontSize:'1.5vh'}}/> 
                    
                </label>
                <input id="likeInput" type="submit"  onClick={addLike}/>
        </div>
    )
}

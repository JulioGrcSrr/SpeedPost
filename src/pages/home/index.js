import React, {useContext , useState} from 'react'
import { CreatePost, Navbar, PopUp , CreateRoom } from '../../containers'
import Feed from '../../containers/feed';
import FeedRoom from '../../containers/feed-room';
import { UserContext } from '../../contexts/user'
import './style.css';
export default function Home() {
    const [user, setUser] = useContext(UserContext).user
    const [layout, setLayout] = useState(false);
    const [site, setSite] = useState('Rooms');

    const changeLayout = (() =>{
        if(layout){
            setLayout(false)
            setSite('Rooms')
        }else{
            setLayout(true)
            setSite('Post')
        }
    })

    return (
        <div className="home">
          
            <Navbar />
            <div className="homeLayout">
            {/* check if the user is logged */}
            {user ? <button onClick={changeLayout}className="siteBtn" >{site}</button> : <PopUp /> }
            {layout ? <div className="homeBox"> {user ? <CreateRoom /> : <p></p>} {user ? <FeedRoom/> : <p></p>} </div> : 
            
            <div className="homeBox">
                {user ? <CreatePost /> : <p></p>} 
                
                {user ? <Feed /> : <p></p>}
            </div>}
            </div>
        </div>
    )
}

import React, {useContext , useState} from 'react'
import { CreatePost, Navbar, PopUp } from '../../containers'
import Feed from '../../containers/feed';
import { UserContext } from '../../contexts/user'
import './style.css';
export default function Home() {
    const [user, setUser] = useContext(UserContext).user
    const [layout, setLayout] = useState(false);

    const changeLayout = (() =>{
        if(layout){
            setLayout(false)
        }else{
            setLayout(true)
        }
    })

    return (
        <div className="home">
            <Navbar />
            <div >
            {/* check if the user is logged */}
            {user ? <button onClick={changeLayout}>Hola</button> : <PopUp /> }
            {layout ? <div> work </div> : <div className="homeBox">
                {user ? <CreatePost /> : <p></p>} 
                
                {user ? <Feed /> : <p></p>}
            </div>}
            </div>
        </div>
    )
}

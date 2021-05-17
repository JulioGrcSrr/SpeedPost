import React , {useState , useEffect} from 'react'
import { db } from '../../firebase';
import Room from '../rooms';
import './style.css';

export default function FeedRoom() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
       db.collection('rooms').orderBy('timestamp' , 'asc').onSnapshot((snapshot) => 
       {
        setRooms(snapshot.docs.map((doc) =>({id: doc.id, room: doc.data()})));
       })
    }, [])
    
    const roomR = rooms.slice(0).reverse();
    
    return (
        <div className="feed">
                  {roomR.map(({id, room})=> {
                      return (
                          <Room 
                          key={id}
                            id={id}
                            profileUrl={room.profileUrl}
                            username={room.username}
                            title={room.title}
                            userId={room.userId}
                            Roomtimestamp={room.date}
                          />
                      )
                  })}
        </div> 
    )
}
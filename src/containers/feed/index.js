import React , {useState , useEffect} from 'react'
import { Post } from '..'
import { db } from '../../firebase';
import Room from '../rooms';
import './style.css';

export default function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
       db.collection('posts').orderBy('timestamp' , 'asc').onSnapshot((snapshot) => 
       {
        setPosts(snapshot.docs.map((doc) =>({id: doc.id, post: doc.data()})));
       })
    }, [])
    const postR = posts.slice(0).reverse();
    return (
        <div className="feed">
                  {postR.map(({id, post})=> {
                      return (
                      <Post
                      key={id}
                        id={id}
                        profileUrl={post.profileUrl}
                        username={post.username}
                        photoUrl={post.photoUrl}
                        content={post.content}
                        userId={post.userId}
                        likes={post.likes}
                        comments={post.comments}
                        date={post.date}
                      />  
                      
                      )
                  })}
        </div> 
    )
}

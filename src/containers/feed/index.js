import React , {useState , useEffect} from 'react'
import { Post } from '..'
import { db } from '../../firebase';
import './style.css';

export default function Feed() {

    const [posts, setPosts] = useState([]);
    //get all the information from post collection and send this data to post component
    useEffect(() => {
       db.collection('posts').onSnapshot((snapshot) => 
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
                      />
                      )
                  })}
        </div> 
    )
}

import { Avatar } from '@material-ui/core'
import React ,{useEffect,useState}from 'react'
import './sidebatchat.css'
// eslint-disable-next-line no-unused-vars
import db from './firebase'
import {Link} from 'react-router-dom'
function SidebarChat(props) {
    const [seed, setseed] = useState('')
    const [messagesfromfirebase, setmessagesfromfirebase] = useState('')
    useEffect(() => {
       setseed(Math.floor(Math.random()*5000))
    }, [])
useEffect(() => {
    if(props.id){
        db.collection('ROOMS').doc(props.id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
           setmessagesfromfirebase(snapshot.docs.map(doc=>doc.data)) 
        })
        console.log(messagesfromfirebase)
    }
   
},)
    return (  <Link to={`/rooms/${props.id}`}>
        <div className="sidebarchat">
      
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarinfo">
        <h2>{props.name}</h2>
        <p>{messagesfromfirebase[0]?.message}</p>
        </div>
            
        </div></Link>
    )
}

export default SidebarChat

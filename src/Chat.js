import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import React,{useState,useEffect} from 'react'
import MicIcon from '@material-ui/icons/Mic';
import "./Chat.css"
import {useSelector} from 'react-redux'
import axios from 'axios'
import db from './firebase'
import firebase from 'firebase'
import {useParams} from 'react-router-dom'
function Chat({messages}) {
    const [firebasemessages, setfirebasemessages] = useState([])
    const user = useSelector(state => state.user)
    const {roomId}=useParams();
    const [input, setinput] = useState('')
    const [roomname, setroomname] = useState('')
    const [seed, setseed] = useState('')
    useEffect(() => {
       setseed(Math.floor(Math.random()*5000))
    }, [])
    const sendmessage= async(e)=>{
e.preventDefault();
//  await axios.post('http://localhost:4000/messages/new',{
//      message:input,
//      username:{user},
//      timestamp:"Just NOW",
//      received:true
//  })
db.collection('ROOMS').doc(roomId).collection('messages').add({
    message:input,
    name:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),

})

 setinput('');
    }
   useEffect(() => {
     if(roomId) {
         db.collection('ROOMS').doc(roomId).onSnapshot(
             Snapshot=>{
                 setroomname(Snapshot.data().name)
             }
         )
         db.collection('ROOMS').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>{
             setfirebasemessages(snapshot.docs.map(doc=>doc.data()))
         })
     }
       
   }, [roomId]) 
 // //{message.username} in line70
    return (
        <div className="chatt">
            <div className="chatt_header" >
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
       
            <div className="chatt_headerinfo">
            <h3>{roomname}</h3>
            <p>last Seen{" "}
            {new Date(firebasemessages[firebasemessages.length-1]?.timestamp?.toDate()).toUTCString()}
            </p>

            </div>

            <div className="chatt_headerright">
            <IconButton>
            <SearchOutlined/>
            </IconButton>
            <IconButton>
            <AttachFile/>
            </IconButton>
            <IconButton><MoreVert/>
            </IconButton>
            </div>
            </div>
            <div className="chat_body">
            {firebasemessages?.map(message=>(
                <p className={`chat_message ${message.name===user.displayName 
                   && 
                    'chat_receiver'}`}>
               <span className="chat_name">
              
               {message.name}
               </span>
                {message.message}
                <span className="chat_timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
                    
                
                </span>
                </p>

            ))

            }
           
        
            </div>
            <div className="chat_footer" >
            <InsertEmoticonIcon/>
            <form>
            <input onChange={e=>setinput(e.target.value)} value={input} placeholder="Type a message" />
            <button onClick={sendmessage} type="submit">send a message</button>
            </form>
            <MicIcon/>
            </div>

        </div>
    )
}

export default Chat

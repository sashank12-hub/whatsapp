import React ,{useState,useEffect}from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import { SearchOutlined } from '@material-ui/icons';
import {useSelector }from 'react-redux'
import './Sidebar.css'
import db from './firebase'
function Sidebar() {
const [rooms, setrooms] = useState([])
useEffect(() => {const unsubscribe=
   db.collection('ROOMS').onSnapshot(snapshot=>{
      
setrooms(snapshot.docs.map(doc =>(
    {
        id:doc.id,
        data:doc.data(),

    }
)))

   })
   return()=>{
       unsubscribe();
   }
}, [])
const createchat=()=>{
    const roomname=prompt("please enter name for chat room")
    if(roomname){
        var p=(roomname.split("").reverse()).join("")
        db.collection('ROOMS').add({
            name:roomname,
            password:p
        })
    }
}
const user = useSelector(state => state.user)
    return (
        <div className="sidebar">
            <div className="sidebar_header">
            <IconButton>
            <Avatar  alt="Remy Sharp" src={user?.photoURL} />
            </IconButton>
            
            <div className="headerright">
            <IconButton>
            <DonutLargeIcon/>
            </IconButton>
            <IconButton>
           <ChatIcon/>
            </IconButton>
            <IconButton>
            <MoreVertIcon/>
            </IconButton>
            </div>
            </div>

            <div className="search">
            <div style={{ backgroundColor:" white"}} className="searchconstainer">
            <SearchOutlined/>
            <input type="text" placeholder="search or start new chat"/>
            </div>
            </div>
            <div className="chat">
            <div onClick={createchat}><h2>Add New Chat</h2></div>
            {rooms.map(room=>(
                <SidebarChat key ={room.id} id={room.id}
                name={room.data.name}/>
            ))}
            </div>
        </div>
    )
}

export default Sidebar

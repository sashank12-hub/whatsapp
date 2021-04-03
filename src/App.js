import React,{useEffect,useState} from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'
import Pusher from 'pusher-js'
//import axios from './axios'
import Login from './Login'
import{ useSelector} from 'react-redux'
import axios from 'axios'
import{Switch,Route,BrowserRouter} from 'react-router-dom'
function App() {

  const user = useSelector(state => state.user)
  // eslint-disable-next-line no-unused-vars
  const [messages, setmessages] = useState([])
  useEffect(() => {
    async function getreq(){
   const message=await axios.get('http://localhost:4000/messages/sync')
   setmessages(message.data)
    }
getreq()


    },[]);
  

  useEffect(() => {

    const pusher = new Pusher('1017288953a9052f5f73', {
      cluster: 'ap2'
    });
    
    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=> {
     
      setmessages([...messages,data])});
    
     return ()=>{
        channel.unbind_all()
        channel.unsubscribe()
      }
  }, [messages])
  console.log(messages)
  // eslint-disable-next-line no-unused-vars
 


  return (
    <div className='app'>

    {!user ?<Login/>: ( <div className="app_body" style={{display:'flex'}}>
    
    <BrowserRouter>
    <Sidebar/>
    <Switch>
    
    <Route path="/rooms/:roomId"> 
     <Chat messages={messages}/>
    </Route>
    <Route path="/" >
    <h1> Welcome</h1>
    </Route>
    </Switch>
    
    </BrowserRouter>
   
    </div>)}
   
   
      
    </div>
  )
}

export default App

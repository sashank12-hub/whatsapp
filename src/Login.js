import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import * as types from './types'
import {auth,provider} from './firebase'
import {useDispatch} from 'react-redux'
function Login() {
const signIn=()=>{
auth.signInWithPopup(provider).then(result=>{
console.log(result)
dispatch({type:types.SET_USER,payload:result.user})
}).catch(err=>alert(err.message))
}

const dispatch = useDispatch()
    return (
        <div className="login">
            <div className="login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
             alt=''/>
            <div className="login_first">
            <h1>sign in to Whatsapp</h1>
            </div>
            <Button onClick={signIn}>
            Sign In with Google
            </Button>
            </div>
        </div>
    )
}

export default Login

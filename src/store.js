//import { Store } from '@material-ui/icons';
// import React,{createContext,useReducer,useContext} from 'react';
// export const StateContext=createContext();
// export const StateProvider=({reducer,initialState,children})=>(
// <StateContext.Provider value={useReducer(reducer,initialState)}
// >
// {children}
// </StateContext.Provider>
// )
// export const useStateValue=()=> useContext(StateContext)

import {createStore} from 'redux'
import reducer from './reducer'
const store=createStore(reducer)
export default store;
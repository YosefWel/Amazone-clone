import React, { useContext, useEffect } from 'react'
import Routing from './Routing'
import {auth} from "./Utility/firebase"
import { DataContext } from './Components/DataProvider/DataProvider'
import { Type } from "./Utility/action.type"
function App() {
  const [{user, basket}, dispatch] = useContext(DataContext)
useEffect(() => {
  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      dispatch({
type: Type.SET_USER,
user: authUser
      })
    }
    else{
       dispatch({
         type: Type.SET_USER,
         user: null,
       });
    }
  });
}, []);
  return (
    <div>
      <Routing/>
    </div>
  )
}

export default App

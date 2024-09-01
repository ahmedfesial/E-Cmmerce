import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectAuthRoute({children}) {
  const {userToken} = useContext(AuthContext)
  
    return (
   <>
     {!userToken ? children :<Navigate to={"/"}/>}
   </> 
    )
}

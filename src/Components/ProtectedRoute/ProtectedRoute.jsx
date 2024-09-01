import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'
import { AuthContext } from '../../Context/AuthContext'

export default function ProtectedRoute({ children }) {

    const { userToken } = useContext(AuthContext)

    return (
        <>
            {userToken ? children : <Login />}
        </>
    )
}

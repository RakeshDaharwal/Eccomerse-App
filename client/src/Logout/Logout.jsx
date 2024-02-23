import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Store/Auth';

export const Logout = () => {

const {logoutUser} = useContext(AuthContext);


    useEffect(() => {
        logoutUser()
    }, [logoutUser])

    return <Navigate to="/" />
}

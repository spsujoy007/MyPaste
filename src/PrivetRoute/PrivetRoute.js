import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const PrivetRoute =  ({children}) => {
    const {user} =  useContext(AuthContext);
    const localData = localStorage.getItem('userdata')
    const userData = JSON.parse(localData)

    const navigate = useNavigate()
    
        if(!userData?.email){
            navigate('/login')
        }
        else{
            return children
        }
    
};

export default PrivetRoute;
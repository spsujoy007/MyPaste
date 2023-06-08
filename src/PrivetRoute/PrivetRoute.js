import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const PrivetRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
    
    try{
        if(!user?.uid){
            navigate('/login')
            // return
        }
    }
    finally{
        return children
    }
    
};

export default PrivetRoute;
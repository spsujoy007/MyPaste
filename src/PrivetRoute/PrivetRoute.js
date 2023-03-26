import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const PrivetRoute = ({children}) => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext);
    if(!user?.uid){
        navigate('/login')
        return
    }

    return children
    
};

export default PrivetRoute;
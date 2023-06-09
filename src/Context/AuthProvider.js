import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { app } from '../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
const googleProvider = new GoogleAuthProvider()

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [fieldValue, setFieldValue] = useState()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSign = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserData = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
        })

        return () =>{
            unSubscribe()
        }
    }, [])

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Fething items list start 
    const {data: myNotesTotal = [], refetch, isLoading} = useQuery({
        queryKey: ['myNotesTotal'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/notes`);
            const data = await res.json()
            return data
        }
    })
    // Fething items list end 



    const authValue = {
        user,
        createUser,
        updateUserData,
        loading,
        login,
        logout,
        refetch,
        setFieldValue,
        fieldValue,
        googleSign
    }

    return (
        <div>
            <AuthContext.Provider value={authValue}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
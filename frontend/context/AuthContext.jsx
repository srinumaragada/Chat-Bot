import {  onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();


export const AuthProvider=({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const signInWithGoogle=async()=>{
        return await signInWithPopup(auth, googleProvider)
    }


    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])


    const value={
        signInWithGoogle
    };
    return <AuthContext.Provider value={value}>
            {children}
    </AuthContext.Provider>
}
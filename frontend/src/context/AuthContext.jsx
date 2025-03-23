import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

// authProvider 
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    // login the user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // sign in google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };

    // admin login
    const adminLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/admin', { username, password });
            setCurrentUser(response.data.admin);
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to login as admin', error);
            alert('Failed to login as admin');
        }
    };

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null); // Ensure currentUser is set to null on logout
        navigate('/admin');
    };

    // manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        adminLogin,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
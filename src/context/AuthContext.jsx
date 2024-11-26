import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

const Context = createContext()

export const useAuth = () => useContext(Context)

export default function AuthContext({ children }) {
    const [user, setUser] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            console.log(user);
            setUser(user)
        })
    }, [])


    const SignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider); // Sign in with Google
            const user = result.user; // Get user data from Firebase

            // Add user to Firestore
            await setDoc(doc(db, "drivers", user.uid), {
                name: user.displayName,
                id: user.uid,
                email: user.email,
                role: "driver", // Set the role as 'driver'
                location: { lat: null, lng: null }, // Default location, update later
            });

            console.log("User signed in:", user);

            // Navigate to the driver's dashboard
            Navigate('/driver');
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };



    async function SignOut() {
        await signOut(auth);
        setUser(null)
        Navigate('/')
    }

    const value = {
        SignInWithGoogle,
        SignOut,
        user,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

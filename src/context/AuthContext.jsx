import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

const Context = createContext()

export const useAuth = () => useContext(Context)

export default function AuthContext({ children }) {
    const [user, setUser] = useState(null);
    const [mobile, setMobile] = useState('');
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
                id: user.uid,
                name: user.displayName,
                email: user.email,
                mobile: mobile,
                role: "driver", // Set the role as 'driver'
                location: { lat: null, lng: null }, // Default location, update later
            });

            console.log("User signed in:", user);

            // Navigate to the driver's dashboard
            const driverNameUrl = user.displayName.replace(/\s+/g, '-');
            Navigate(`/driver/${driverNameUrl}`);
            setMobile('')
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };

    const LogIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User Info:", user);

            // Check if the user already exists in Firestore
            const userRef = doc(db, 'drivers', user.uid);  // Use your collection name here (e.g., 'users')
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // User exists, redirect to dashboard
                console.log("User exists in Firestore");
                const driverNameUrl = user.displayName.replace(/\s+/g, '-');
                Navigate(`/driver/${driverNameUrl}`);
            } else {
                alert('Register first then try to Log-In')
                Navigate(-1);
            }
        } catch (err) {
            console.log(err.message);

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
        mobile,
        setMobile,
        LogIn,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

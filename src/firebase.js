import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBmjFiHUzrmAbAMSx9wobU4rHdhsH1RtS4",
  authDomain: "netflix-clone-b77b6.firebaseapp.com",
  projectId: "netflix-clone-b77b6",
  storageBucket: "netflix-clone-b77b6.firebasestorage.app",
  messagingSenderId: "764214012274",
  appId: "1:764214012274:web:b2aba64a0d601784ebd5eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid, 
            name,
            authProvider: "local",
            email,
        });
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
};

const login = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
};
const logout = async()=>{
    signOut(auth);
}

export{auth, db, login, signup, logout}
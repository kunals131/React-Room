
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBR8aU2hvBx36igR-oxdss9-dfnoFm7PUo",
  authDomain: "react-class-f5ef1.firebaseapp.com",
  projectId: "react-class-f5ef1",
  storageBucket: "react-class-f5ef1.appspot.com",
  messagingSenderId: "1017796196847",
  appId: "1:1017796196847:web:d3c4218f41a7eeb85a1e1a"
};

export const app = initializeApp(firebaseConfig);


export const database = getFirestore();
export const auth = getAuth();



const AddUserToDatabase = async (user,fullname)=>{
    let userObject = {
        id : user.uid,
        name : fullname,
        email : user.email,
        classes : [],
        hosts : [],
    }
   
    const docRef = await setDoc(doc(database,"users", user.uid), userObject);
    return userObject;
}


export const createUser = async (signupForm) =>{
    try {
    const response = await createUserWithEmailAndPassword(auth,signupForm.email, signupForm.password);
    console.log(response);
     const user = AddUserToDatabase(response.user, signupForm.fullname);
     return user
    }
    catch(e){
        console.log(e.message); alert('Error while creating User!')
    }
}

export const loginUser = async ({email,password}) =>{
    try {
   const res = await signInWithEmailAndPassword(auth,email,password)
   console.log(res);
    }
    catch(e) {
        alert('Cannot login due to some problem');
        console.log(e.message);
    }

}




export const getUserWithId = async (uid)=>{
const userRef = doc(database, "users", uid);
   const user = await getDoc(userRef);
   console.log(user.data());
   return user.data();
}


export const logoutUser = async()=>{
    try {
    await signOut(auth)
    console.log('LOGGED OUT!!')
    } catch(er){
        console.log(er);
        alert('Error while logging out')
    }
}


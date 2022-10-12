
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getFirestore,  setDoc, doc, getDoc, } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBLOuQ5M_nOe41Sb372BBf0nZiI3zqNmXw",
  authDomain: "react-room-c44cf.firebaseapp.com",
  projectId: "react-room-c44cf",
  storageBucket: "react-room-c44cf.appspot.com",
  messagingSenderId: "690865553594",
  appId: "1:690865553594:web:bb4a38b977f9a537320283"
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
   
   await setDoc(doc(database,"users", user.uid), userObject);
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


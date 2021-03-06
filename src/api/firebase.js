// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
// import { useFirestoreQuery } from "react-query-firebase/firestore";
import {
    getFirestore,
    query,
    collection,
    limit,
    addDoc,
    where,
    orderBy,
    onSnapshot,
    QuerySnapshot,
    doc,
    DocumentData,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbLWA-Dn5H6Lczu3_tdR3hByVAtZ3t_jw",
    authDomain: "jumpstart-uvec.firebaseapp.com",
    projectId: "jumpstart-uvec",
    storageBucket: "jumpstart-uvec.appspot.com",
    messagingSenderId: "328890105206",
    appId: "1:328890105206:web:789b4fc98d9e9fe1d74e57",
    measurementId: "G-6P83WW3NJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        const signInuser = await signInWithEmailAndPassword(auth, email, password)
        return signInuser;

    } catch (err) {
        console.error(err);
        return false;
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        }).then(function () {
            return true;
        });
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const getUserDataFromEmail = async (email) => {

    const myDocRef = doc(db, "users", email);
    const myDoc = await getDoc(myDocRef);
    if (myDoc.exists()) {
        return(myDoc.data().projects);
    } else {
        return false;
    }
}

export const updateUserProjects = async (email, projectsData) => {

    const myDocRef = doc(db, "users", email);
    const setData = await updateDoc(myDocRef,{
        projects: projectsData
    });
    console.log(setData);
}


export const logout = () => {
    signOut(auth);

};
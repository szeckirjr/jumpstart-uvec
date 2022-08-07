// Import the functions you need from the SDKs you need
// import { useFirestoreQuery } from "react-query-firebase/firestore";
import 'firebase/auth';
import firebase from "firebase/app";
import "firebase/firestore";
import ReactObserver from 'react-event-observer';
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
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(app);

const db = firebase.firestore();

export const firebaseObserver = ReactObserver();

auth.onAuthStateChanged(function(user) {
    firebaseObserver.publish("authStateChanged", loggedIn())
});

export function getUser(){
    return auth.currentUser.email;
}

export function loggedIn() {
    return !!auth.currentUser;
}

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        const signInuser = await auth.signInWithEmailAndPassword(email, password)
        if (signInuser) {
            const user = signInuser.user.email;
            return user;
        }

    } catch (err) {
        console.error(err);
        return false;
    }
};

// handle incoming request.
export const request = async () => {
    //determine token validity unless login request.
    //return unauthorized except return response.
}

export const checkUserExists = async () => {
    const user = auth.currentUser;
    if (user != null) {
        return true;
    }
    return false;
}

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        const result = await db.collection("users").doc(user.uid).set({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        }).then(function () {
            console.log("User added with ID: ") // never fires
            return true;
        }).catch(function (error) {
            console.error(error) // never fires
            return false;
        });
        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

//return user projects with email
export const getUserDataFromEmail = async () => {

    const user_uid = auth.currentUser.uid;
    let userProjects = [];
   
    await db.collection("users").doc(user_uid).collection("projects").get().then(async function (querySnapshot) {
        querySnapshot.docs.forEach((doc) => {
            userProjects.push(doc.data());
        })
    });

    return userProjects;
}

/**
 * Add multiple steps to a project.
 * 
 * @param {*} user 
 * @param {*} projectID 
 * @param {*} step 
 */
export const createProjectMultiSteps = async (user, projectID, steps = []) => {

    // const stepsQuery = collection(firebase.firestore(), "projects", projectID, "steps");
    // const projectRef = doc(firebase.firestore(), "projects", projectID);

    // setDoc(projectRef, { "userID": user });

    // // steps.forEach(step => {
    // //     setDoc(stepsQuery, step);
    // // });

    return true;

}


/**
 * Add multiple tasks to a step.
 * 
 * @param {*} user 
 * @param {*} projectID 
 * @param {*} stepID 
 * @param {*} task 
 */
export const addStepMultiTasks = async (user, projectID, stepID, task = []) => {

}



export const updateUserProjects = async (email, projectsData) => {

    // const q = query(collection(firebase.firestore(), "users"), where("email", "==", email));
    // const querySnapshot = await getDocs(q);

    // if (!querySnapshot || querySnapshot.size > 1 || querySnapshot.size == 0) {
    //     return false;
    // }

    // querySnapshot.forEach((doc) => {
    //     const docID = doc.id;
    // })

    // const collectionRef = collection(firebase.firestore(), "users", "projects");

    // projectsData.forEach(async(project) => {
    //    await setDoc(collectionRef, {
    //         description: project.description,
    //         title: project.title,
    //     })
    // });


    return true;

}


export const logout = () => {
    auth.signOut();

};

export { auth }
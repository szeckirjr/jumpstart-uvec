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

auth.onAuthStateChanged(function (user) {
    firebaseObserver.publish("authStateChanged", loggedIn())
});

export function getUser() {
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
export const createProjectMultiSteps = async (projectID, steps = []) => {

    // const stepsQuery = collection(firebase.firestore(), "projects", projectID, "steps");
    // const projectRef = doc(firebase.firestore(), "projects", projectID);
    try {
        Promise.all(
            steps.forEach(step => {
                addStepstoProject(projectID, step);
            })
        );
    } catch (e) {
        console.debug('Error while trying to add multiple steps to project');
        console.debug(e);
    }
    // setDoc(projectRef, { "userID": user });

    // // steps.forEach(step => {
    // //     setDoc(stepsQuery, step);
    // // });

    return true;

}

export const addStepstoProject = async (projectID, step = {}) => {

    // const stepsQuery = collection(firebase.firestore(), "projects", projectID, "steps");
    // const projectRef = doc(firebase.firestore(), "projects", projectID);
    const user_uid = auth.currentUser.uid;
    if (!step.description || !step.title || !step.id) {
        console.log("Error adding step: Missing paramters");
        return false;
    }

    try {
        await db.collection('users').doc(user_uid).collection("projects").doc(projectID).collection("steps").add(step);
    } catch (e) {
        console.debug('Error while trying to add a step to project');
        console.debug(e);
    }

    return true;

}

//R
export const getProjectSteps = async (projectID) => {
    const user_uid = auth.currentUser.uid;
    if (!projectID) {
        return false;
    }

    try {
        const rawSteps = await db.collection('users').doc(user_uid).collection("projects").doc(projectID).collection('steps').get();
        if (rawSteps.docs.length > 0) {
            const steps = rawSteps.docs.map((doc) => {
                const data = doc.data();
                const title = doc.title;
                const id = doc.id;
                const isCompleted = doc.isCompleted;
                return {
                    id,
                    title,
                    isCompleted,
                    ...data,
                };
            });
            return steps;
        } else {
            return [];
        }
    } catch (e) {
        console.debug('Error while trying to add a step to project');
        console.debug(e);
        return [];
    }

}


// export const getStepTasks
export const getStepTasks = async (projectID, stepID) => {
    const user_uid = auth.currentUser.uid;

    if (!projectID) {
        return [];
    }

    try {

        const stepSnapshot = await db.collection('users')
            .doc(user_uid)
            .collection('projects')
            .doc(projectID)
            .collection('steps')
            .where('step_id', '==', stepID)
            .get();

        //ensure that length is 1.
        if (stepSnapshot.size !== 1) {
            console.log('More than 1 documents found for this step ID');
            return [];
        }

        const stepRef = stepSnapshot.docs[0].ref;

        const taskData = await stepRef.collection('tasks').get().then((taskSnapshot) => {
            const tasks = taskSnapshot.docs.map((task) => {
                return task.data();
            })
            return tasks;
        });

        return taskData;
    }
    catch (e) {
        console.log('Error while trying to get tasks from project');
        console.log(e);
        return [];
    }

}

// export const getProjects

//C, U
export const createProject = async (projectData) => {

    const user_uid = auth.currentUser.uid;
    if (!projectData.description || !projectData.title || !projectData.id) {
        console.log("Error adding step: Missing parameters");
        return false;
    }

    try {
        await db.collection('users').doc(user_uid).collection("projects").add({
            'description': projectData.description,
            'title': projectData.title
        });
    } catch (e) {
        console.debug('Error while trying to add a step to project');
        console.debug(e);
    }

    return true;

}

// export const updateStepsforProject

// export const updateTasksforStep

// //D
// export const removeProject

// export const removeStepfromProject

// export const removeTaskfromStep


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
import firebase from 'firebase/compat/app';
import "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDbLWA-Dn5H6Lczu3_tdR3hByVAtZ3t_jw",
    authDomain: "jumpstart-uvec.firebaseapp.com",
    projectId: "jumpstart-uvec",
    storageBucket: "jumpstart-uvec.appspot.com",
    messagingSenderId: "328890105206",
    appId: "1:328890105206:web:789b4fc98d9e9fe1d74e57",
    measurementId: "G-6P83WW3NJL"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();


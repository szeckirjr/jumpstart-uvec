// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
import React from "react";
import firebase from "firebase";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const AuthContext = React.createContext<firebase.User | null>(null);
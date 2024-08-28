// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWCX65kogfcoHnMx2umHN0C2KXztApD0c",
  authDomain: "react-auth-tutorial-f571d.firebaseapp.com",
  projectId: "react-auth-tutorial-f571d",
  storageBucket: "react-auth-tutorial-f571d.appspot.com",
  messagingSenderId: "68036342892",
  appId: "1:68036342892:web:4f7c1781af9e0045435449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export  const auth = getAuth(app);
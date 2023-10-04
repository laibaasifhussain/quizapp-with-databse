// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNKuzIuxjnSEDLwHrjUO8I816OiAfYqMc",
  authDomain: "react-quizapp-d0a36.firebaseapp.com",
  databaseURL: "https://react-quizapp-d0a36-default-rtdb.firebaseio.com",
  projectId: "react-quizapp-d0a36",
  storageBucket: "react-quizapp-d0a36.appspot.com",
  messagingSenderId: "875569612124",
  appId: "1:875569612124:web:8e09308cd16326559eed99",
  measurementId: "G-NJLVPCMYML"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
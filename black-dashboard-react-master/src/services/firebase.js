import Firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVhQ-j-k0jFVBi9Sk1Ot9U_aIUw7AWtgY",
    authDomain: "targetmetric-8405c.firebaseapp.com",
    databaseURL: "https://targetmetric-8405c-default-rtdb.firebaseio.com",
    projectId: "targetmetric-8405c",
    storageBucket: "targetmetric-8405c.appspot.com",
    messagingSenderId: "574651127571",
    appId: "1:574651127571:web:615a6d9331f0853e6dece6",
    measurementId: "G-4Q3W7T1GDL"
};
const db = Firebase.initializeApp(firebaseConfig);
export default db;

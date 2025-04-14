// import my firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhv1TAkMoBQoISFIgz8LmYd7fwVfPByzg",
  authDomain: "lab07-6c469.firebaseapp.com",
  projectId: "lab07-6c469",
  storageBucket: "lab07-6c469.appspot.com",
  messagingSenderId: "412602809198",
  appId: "1:412602809198:web:1b20075998dd98e91f5f7f",
  measurementId: "G-6H6K1SRR2W"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClEAJ4HKhzHOToU3pq7kw_nnJ-4Hj2kSQ",
  authDomain: "goldhouse-construction.firebaseapp.com",
  projectId: "goldhouse-construction",
  storageBucket: "goldhouse-construction.appspot.com",
  messagingSenderId: "104786335808",
  appId: "1:104786335808:web:f6b4761fded2716fc527a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Database
const db = getFirestore(app);

export default db;

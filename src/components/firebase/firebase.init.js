
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBxheHVeUfmgKwKrj-tZNcHzoYjUjUrXM0",
  authDomain: "travelease-7f8d1.firebaseapp.com",
  projectId: "travelease-7f8d1",
  storageBucket: "travelease-7f8d1.firebasestorage.app",
  messagingSenderId: "773645194770",
  appId: "1:773645194770:web:32bda3cb149822ea1faacb"
};

const app = initializeApp(firebaseConfig);



const auth = getAuth(app);

export default auth;

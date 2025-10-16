import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7zdFuHRxo4E-DIUeCtMe8NAAqC9sKTHA",
  authDomain: "eventos-mvp.firebaseapp.com",
  projectId: "eventos-mvp",
  storageBucket: "eventos-mvp.firebasestorage.app",
  messagingSenderId: "78766830083",
  appId: "1:78766830083:web:8ed10f346606d3300d5436"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

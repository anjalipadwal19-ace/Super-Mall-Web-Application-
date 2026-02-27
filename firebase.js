/* ================= Firebase ================= */
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ================= Web app's Firebase configuration ================= */
const firebaseConfig = {
  apiKey: "AIzaSyBtRTvQWQliMzSfjWorfNDV0KSoPAh78TI",
  authDomain: "supermall-994d9.firebaseapp.com",
  projectId: "supermall-994d9",
  storageBucket: "supermall-994d9.firebasestorage.app",
  messagingSenderId: "568601789176",
  appId: "1:568601789176:web:1ed7efe084de1ec341b10d"
};

/* ================= Initialize Firebase ================= */
const app=initializeApp(firebaseConfig);

/* ================= Export Firebase services ================= */
export const db=getFirestore(app);
export const auth=getAuth(app);
export{ collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc };
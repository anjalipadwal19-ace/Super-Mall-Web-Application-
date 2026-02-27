import { auth, db, doc, setDoc, getDoc }
from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ---------- Register ---------- */
window.register = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const userCredential = await createUserWithEmailAndPassword( auth, email, password );
        const uid = userCredential.user.uid;
        await setDoc( doc(db, "users", uid), { role: "user" } );
        alert("Registered Successfully");
    } 
    catch (error) {
        alert(error.message);
    }
}

/* ---------- Login ---------- */
window.login = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid.trim();
        console.log("USER UID:", uid);
        const userData = await getDoc(doc(db, "users", uid));
        if (!userData.exists()) {
            alert("User role document missing!");
            return;
        }
        const role = userData.data().role;
        if (role === "admin") {
            window.location = "admin.html";
        } else {
            window.location = "user.html";
        }
    } catch (error) {
        alert(error.message);
    }
}

/* ---------- Session Check ---------- */
onAuthStateChanged(auth, (user) => {
    const isLoginPage = window.location.pathname.includes("login.html");
    if (!user && !isLoginPage) {
        window.location = "login.html";
    }
});

/* ---------- Logout ---------- */
window.logout = function () {
    signOut(auth);
}
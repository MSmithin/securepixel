// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyDnKXrMRB5QmEnJoyY08qDpZLUNlzfMYtM",
  authDomain: "pixel-f48d9.firebaseapp.com",
  projectId: "pixel-f48d9",
  storageBucket: "pixel-f48d9.firebasestorage.app",
  messagingSenderId: "496825427989",
  appId: "1:496825427989:web:7ac85b450d57f6b2de061c",
  measurementId: "G-Y3PMZRXXCG"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const isProjectsPage = window.location.pathname.includes("projects.html");
const isCmsPage = window.location.pathname.includes("cms.html");

if (isProjectsPage) {
    const galleryContainer = document.getElementById("gallery");
    db.collection("gallery").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const item = document.createElement("div");
            item.className = "gallery-item";
            item.innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            `;
            galleryContainer.appendChild(item);
        });
    }).catch((error) => {
        console.error("Error fetching gallery:", error);
        galleryContainer.innerHTML = `
            <div class="gallery-item">
                <img src="assets/images/sample1.jpg" alt="Sample Site 1">
                <h3>Sample Site 1</h3>
                <p>A sleek portfolio.</p>
            </div>
            <div class="gallery-item">
                <img src="assets/images/sample2.jpg" alt="Sample Site 2">
                <h3>Sample Site 2</h3>
                <p>E-commerce excellence.</p>
            </div>
        `;
    });
} else if (!isCmsPage) {
    db.collection("content").doc("intro").get().then((doc) => {
        if (doc.exists) {
            document.getElementById("intro-text").textContent = doc.data().text;
        }
    }).catch((error) => {
        console.error("Error fetching intro text:", error);
    });
}

const expandingBox = document.getElementById("expanding-box");
expandingBox.addEventListener("animationend", () => {
    expandingBox.style.background = "#2c003e";
});

// Login button logic
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
        window.location.href = "https://your-firebase-hosted-admin.web.app";
    } else {
        // Simple login prompt (replace with a modal in production)
        const email = prompt("Enter your email:");
        const password = prompt("Enter your password:");
        if (email && password) {
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.href = "https://your-firebase-hosted-admin.web.app";
                })
                .catch((error) => {
                    alert("Login failed: " + error.message);
                });
        }
    }
});

auth.onAuthStateChanged((user) => {
    loginButton.textContent = user ? "CMS Dashboard" : "Login";
});

document.addEventListener("DOMContentLoaded", () => {
    console.log(`SecurePixel ${isProjectsPage ? "Projects" : isCmsPage ? "CMS" : "Home"} loaded with Firebase`);
});

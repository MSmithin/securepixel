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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Determine which page we're on
const isProjectsPage = window.location.pathname.includes("projects.html");

if (isProjectsPage) {
    // Projects page: Fetch and render gallery
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
} else {
    // Homepage: Fetch intro text
    db.collection("content").doc("intro").get().then((doc) => {
        if (doc.exists) {
            document.getElementById("intro-text").textContent = doc.data().text;
        }
    }).catch((error) => {
        console.error("Error fetching intro text:", error);
    });

    // Animation cleanup
    const expandingBox = document.getElementById("expanding-box");
    expandingBox.addEventListener("animationend", () => {
        expandingBox.style.background = "#2c003e"; // Ensure solid background persists
        expandingBox.style.borderRadius = "0"; // Remove rounded corners
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(`SecurePixel ${isProjectsPage ? "Projects" : "Home"} loaded with Firebase`);
});

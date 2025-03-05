// Firebase configuration (replace with your own from Firebase Console)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch and display intro text
db.collection("content").doc("intro").get().then((doc) => {
    if (doc.exists) {
        document.getElementById("intro-text").textContent = doc.data().text;
    }
}).catch((error) => {
    console.error("Error fetching intro text:", error);
});

// Fetch and render gallery items
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
    // Fallback content
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

// Contact section toggle
function toggleContact() {
    const contactSection = document.getElementById("contact-section");
    const arrow = document.querySelector(".arrow-down");
    if (contactSection.classList.contains("visible")) {
        contactSection.classList.remove("visible");
        arrow.classList.remove("hidden");
    } else {
        contactSection.classList.add("visible");
        arrow.classList.add("hidden");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("SecurePixel loaded with Firebase");
});

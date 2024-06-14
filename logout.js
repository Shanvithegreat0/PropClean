import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn2hwFs7g1StFNAGVbiOxTTcLbuNq1le0",
  authDomain: "propclean.firebaseapp.com",
  databaseURL: "https://propclean-default-rtdb.firebaseio.com",
  projectId: "propclean",
  storageBucket: "propclean.appspot.com",
  messagingSenderId: "795234019311",
  appId: "1:795234019311:web:369566b90b91139164781a",
  measurementId: "G-CE3LFP4HSJ"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



const logoutButton = document.getElementById("logoutBtn");

// Add event listener for logout button
logoutButton.addEventListener("click", function() {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("Signed out successfully");
            window.location.href = "index.html"; // Redirect to login page after logout
        })
        .catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
        });
});